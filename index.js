require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
morgan.token('data', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const firstLine = `Phonebook has info for ${persons.length} people`
  const time = new Date()
  const content = `<p>${firstLine}</p> <p>${time}</p>`
  response.send(content)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'either name or number is missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
    //console.log("SAVED PERSON", savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log("APP.DELETE CALLED")
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log("DELETE RESULT", result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})