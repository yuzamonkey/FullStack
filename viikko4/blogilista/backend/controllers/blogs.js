const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//routet (/api/blogs) määritelty sovelluslogiikassa app.js. 
//Määriteltyä routea '/' käytetään,
//jos polun alkuosa on /api/blogs.
//Siksi blogsRouter-olion sisällä riittää käyttää loppuosia

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
        const blog = new Blog({
            title: body.title,
            author: body.title,
            url: body.url,
            likes: body.likes || 0
        })
        const savedBlog = await blog.save()

        response.json(savedBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    console.log(request.params.id)
    const result = await Blog.findByIdAndDelete(request.params.id)
    console.log("RESULT", result)
    response.json({})
})

module.exports = blogsRouter