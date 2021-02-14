const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//routet (/api/blogs) määritelty sovelluslogiikassa app.js. 
//Määriteltyä routea '/' käytetään,
//jos polun alkuosa on /api/blogs.
//Siksi blogsRouter-olion sisällä riittää käyttää loppuosia

const getTokenFrom = request => {
    const prefix = 'bearer '
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith(prefix)) {
        return authorization.substring(prefix.length)
    } else {
        return null
    }
}


blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
   
    console.log("BLOG", blog)
    console.log("LIKESTYPE", typeof (blog.likes))
    response.json(blog.toJSON())
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    if (!body.title || !body.url) {
        const error = {
            name: 'ValidationError',
            message: 'Title or url not found'
        }
        next(error)
    } else {
        //4.19
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET) //palauttaa kentät username ja id
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const editableBlog = await Blog.findById(request.params.id)
    editableBlog.likes = request.body.likes
    await Blog.findByIdAndUpdate(request.params.id, editableBlog)
    response.json(editableBlog.toJSON())
})



blogsRouter.delete('/:id', async (request, response, next) => {
    console.log(request.params.id)
    const result = await Blog.findByIdAndDelete(request.params.id)
    console.log("RESULT", result)
    response.json({})
})

module.exports = blogsRouter