import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries/queries'

const Recommended = (props) => {
  const result = useQuery(ME)
  const bookResult = useQuery(ALL_BOOKS)

  if (result.loading || bookResult.loading) {
    return (<div>loading...</div>)
  }

  if (!props.show) {
    return null
  }

  const favoriteGenre = result.data.me.favoriteGenre
  const books = bookResult.data.allBooks
  const recommendedBooks = books.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    
    </div>
  )
}

export default Recommended