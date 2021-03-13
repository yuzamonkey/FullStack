const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: () => Book.find({}),
    me: (root, args, context) => { return context.currentUser }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({name: root.name})
      const authorId = author._id
      const allAuthorsBooks = await Book.find({author: authorId})
      return allAuthorsBooks.length
    }
  },
  Book: {
    author: async (root) => {
      const authorId = root.author
      const author = await Author.findById(authorId)
      return author
    }
  },
  Mutation: {
    //USER
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },

    login: async (root, args) => {
      console.log("LOGIN CALLED", args.username)
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        console.log("WRONG CREDENTIOALS")
        throw new UserInputError("wrong credentials")
      }
      console.log("LOGIN SUCCESS")
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    //AUTHOR
    addAuthor: async (root, args) => {
      console.log("ARGS", args)
      const author = new Author({ ...args })
      console.log("AUTHOR", author)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      if (!context.decodedToken) {
        console.log("NO TOKEN, NO AUTHENTICATION")
        throw new UserInputError("No authentication")
      } else {
        try {
          const author = await Author.findOne({ name: args.name })
          author.born = args.setBornTo
          try {
            await author.save()
            return author
          } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
          }
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
    },
    //BOOK
    addBook: async (root, args, context) => {
      console.log("ADD BOOK CALLED WITH ARGS", args)
      if (!context.decodedToken) {
        console.log("NO TOKEN, NO AUTHENTICATION")
        throw new UserInputError("No authentication")
      } else {
        const author = args.author
        const isfound = await Author.find({ name: author })
        let authorId = null
        if (isfound.length === 0) {
          console.log("NO AUTHOR", author)
          const newAuthor = new Author({ name: author })
          try {
            const returnvalue = await newAuthor.save()
            authorId = returnvalue._id
          } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
          }
        } else {
          console.log("AUTHOR FOUND, ID", isfound[0]._id)
          authorId = isfound[0]._id
        }
        const book = new Book({ ...args, author: await Author.findById(authorId) })
        console.log("NEW BOOK", book)
        try {
          await book.save()
          return book
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser, decodedToken }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})



/*
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },

  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
*/