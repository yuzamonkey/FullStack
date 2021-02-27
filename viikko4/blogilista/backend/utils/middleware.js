const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('----')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (process.env.NODE_ENV !== 'test') {
        logger.error(error.message)
    }

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    next(error)
}

const getTokenFrom = request => {
    const prefix = 'bearer '
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith(prefix)) {
        return authorization.substring(prefix.length)
    } else {
        return null
    }
}

const userAuthenticator = async (request, response, next) => {
    request.token = getTokenFrom(request)
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET) //palauttaa kentät username ja id
        if (decodedToken.id) {
            const user = await User.findById(decodedToken.id)
            request.authenticatedUser = user
        }
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userAuthenticator
}