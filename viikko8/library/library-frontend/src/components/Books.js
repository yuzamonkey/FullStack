import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries/queries'
import GenreButtons from './GenreButtons'

const Books = (props) => {

  const [genre, setGenre] = useState(null)

  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const [booksByGenre, setBooksByGenre] = useState([])

  const handleGenreChange = async (genre) => {
    await getBooksByGenre({ variables: { genre: genre } })
    setGenre(genre)
  }

  useEffect(() => {
    if (booksByGenreResult.data) {
      setBooksByGenre(booksByGenreResult.data.allBooks)
    }
  }, [booksByGenreResult])

  if (!props.show) {
    return null
  }



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
      <GenreButtons handleGenreChange={handleGenreChange} />
    </div>
  )
}


export default Books