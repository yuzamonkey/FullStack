import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'
import BirthyearForm from './BirthyearForm'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading</div>
  }
  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
          <BirthyearForm authorsNames={authors.map(a => a.name)}/>

        </tbody>
      </table>
    </div>
  )
}

export default Authors