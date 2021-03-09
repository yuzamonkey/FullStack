import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BORNYEAR, ALL_AUTHORS, ALL_BOOKS } from '../queries/queries'
import Select from 'react-select'

const BirthyearForm = ({ authorsNames }) => {
  const [selectedName, setSelectedName] = useState(null)
  const [year, setYear] = useState('')
  const [setBornyear] = useMutation(SET_BORNYEAR, { refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] })

  const submit = (event) => {
    event.preventDefault()
    const name = selectedName.value
    const setBornTo = Number(year)
    setBornyear({ variables: { name, setBornTo } })
    setSelectedName(null)
    setYear('')
  }

  const options = authorsNames.map(name => {
    const optionObject = {
      value: name, label: name
    }
    return optionObject
  })

  return (
    <div>
      <h3>Set birthyear</h3>
      <Select
        defaultValue={selectedName} onChange={setSelectedName} options={options}/>
      <form onSubmit={submit} >
        born
        <input type="number" value={year} onChange={({ target }) => setYear(target.value)} /><br></br>
        <button>Set</button>
      </form>
    </div>
  )
}

export default BirthyearForm