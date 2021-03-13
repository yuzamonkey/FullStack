import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_GENRES } from '../queries/queries'

const GenreButtons = (props) => {
  const result = useQuery(ALL_GENRES)
  const genres = result.loading ? null : result.data.allGenres

  const handleGenreChange = (event) => {
    event.preventDefault()
    props.setGenre(event.target.value)

  }

  if (result.loading) {
    return <div>loading genres...</div>
  } else {
    return (
      <div>
        <h4>Select genre</h4>
        {genres.map(genre => <button onClick={handleGenreChange} value={genre}>{genre}</button>)}
        <button onClick={handleGenreChange} value={''}>all genres</button>
      </div>
    )
  }
}

export default GenreButtons