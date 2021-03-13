import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'
import GenreButtons from './GenreButtons'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  if (result.loading) {
    return <div>Loading</div>
  }
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const booksByGenre = genre === '' ? books : books.filter(book => book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      {genre === '' ? null : <p>Selected genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Filter by genre</h3>
      <GenreButtons setGenre={setGenre} />
    </div>
  )
}


export default Books