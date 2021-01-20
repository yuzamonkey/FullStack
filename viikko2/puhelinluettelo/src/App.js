import React, { useState, useEffect } from 'react'
import Title from './components/Title'
import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'
import Form from './components/Form'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // miksi tämä ei toimi tällaisenaan?? response.data.map(person => setPersons(persons.concat({name: person.name, number: person.number})))
        const inputData = []
        response.data.map(person => {
          const personObject = {
            name: person.name,
            number: person.number
          }
          inputData.push(personObject)
          return personObject
        })
        setPersons(persons.concat(inputData))
      })
  }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Title text="Phonebook" />
      <Filter handleFilterChange={handleFilterChange} />
      <Title text="add new person" />
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <Title text="Numbers" />
      <ShowPersons persons={persons} filter={filter} />
    </div>
  )

}

export default App