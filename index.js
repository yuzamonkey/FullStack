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



// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456"
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-532523"
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345"
//   },
//   {
//     id: 4,
//     name: "Mary Poppendick",
//     number: "39-23-6423122"
//   }
// ]

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

  // const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)
  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }
})

const generateId = () => {
  let id = Math.floor(Math.random() * 99)
  const ids = persons.map(person => Number(person.id))
  let foundSameId = true
  while (foundSameId) {
    if (ids.includes(id)) {
      id = Math.floor(Math.random() * 99)
    } else {
      foundSameId = false
    }
  }
  return id
}

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
    console.log("SAVED PERSON", savedPerson)
  })
  // const body = request.body
  // const names = persons.map(person => person.name)
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: 'either name or number is missing' })
  // }
  // else if (names.includes(body.name)) {
  //   return response.status(400).json({ error: 'name must be unique' })
  // } else {
  //   const person = {
  //     id: generateId(),
  //     name: body.name,
  //     number: body.number
  //   }
  //   persons = persons.concat(person)
  //   response.json(person)
  // }
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log("APP.DELETE CALLED")
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
      console.log("RESULT", result)
    })
    .catch(error => next(error))
  // const id = Number(request.params.id)
  // persons = persons.filter(person => persons.id !== id)
  // response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})