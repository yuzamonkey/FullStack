import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BORNYEAR, ALL_AUTHORS, ALL_BOOKS } from '../queries/queries'

const BirthyearForm = ({ authorsNames }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [setBornyear] = useMutation(SET_BORNYEAR, { refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] })

  const submit = (event) => {
    event.preventDefault()
    const setBornTo = Number(year)
    setBornyear({ variables: { name, setBornTo } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit} >
        name
        <input type="text" value={name} onChange={({ target }) => setName(target.value)} /><br></br>
        born
        <input type="number" value={year} onChange={({ target }) => setYear(target.value)} /><br></br>
        <button>Set</button>
      </form>
    </div>
  )
}

export default BirthyearForm