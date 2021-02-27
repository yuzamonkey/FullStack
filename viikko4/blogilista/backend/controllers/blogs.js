const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
//routet (/api/blogs) määritelty sovelluslogiikassa app.js. 
//Määriteltyä routea '/' käytetään,
//jos polun alkuosa on /api/blogs.
//Siksi blogsRouter-olion sisällä riittää käyttää loppuosia



blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
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
        if (request.authenticatedUser !== undefined) {
            const blog = new Blog({
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes || 0,
                user: request.authenticatedUser._id
            })
            const savedBlog = await blog.save()
            request.authenticatedUser.blogs = request.authenticatedUser.blogs.concat(savedBlog._id)
            await request.authenticatedUser.save()

            response.json(savedBlog.toJSON())
        } else {
            response.status(401).json({ error: 'no authentication' })
        }
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const editableBlog = await Blog.findById(request.params.id)
    editableBlog.likes = request.body.likes
    await Blog.findByIdAndUpdate(request.params.id, editableBlog)
    response.json(editableBlog.toJSON())
})

const userIsLoggedIn = (request, user) => {
    if (request.authenticatedUser) {
        return (user.toString() === request.authenticatedUser._id.toString())
    } else {
        return false
    }
}


blogsRouter.delete('/:id', async (request, response, next) => {
    console.log(request.params.id)
    const blog = await Blog.findById(request.params.id)
    if (userIsLoggedIn(request, blog.user)) {
        await blog.delete()
        response.json({})
    } else {
        response.status(401).json({ error: 'not authenticated to delete blog' })    
    }
})

module.exports = blogsRouter