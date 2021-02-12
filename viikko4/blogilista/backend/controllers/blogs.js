const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//routet (/api/blogs) määritelty sovelluslogiikassa app.js. 
//Määriteltyä routea '/' käytetään,
//jos polun alkuosa on /api/blogs.
//Siksi blogsRouter-olion sisällä riittää käyttää loppuosia

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (blog.title === undefined) {
        response.status(400)
    }
    if (blog.url === undefined) {
        response.status(400)
    }
    if (blog.likes === undefined) {
        blog.likes = 0
    }
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter