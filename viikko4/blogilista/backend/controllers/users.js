const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const errorHandler = require('../utils/middleware')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (body.password.length < 3) {
        console.log("TOO SHORT PASSWORD")
        //KESKEN
        const error = {
            name: 'ValidationError',
            message: 'Too short password'
        }
        next(error)
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    }
})


module.exports = usersRouter