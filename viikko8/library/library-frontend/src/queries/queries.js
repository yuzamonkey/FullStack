import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username, favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name, born, bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title, author{name}, published, genres
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query getBooksByGenre($genre: String!){
    allBooks (genre: $genre) {
      title, author{name}, published, genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {name}
      published
      genres
    }
  }
`

export const SET_BORNYEAR = gql`
  mutation setBornyear($name: String!, $setBornTo: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`