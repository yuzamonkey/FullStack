import React from 'react'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

import Notification from './Notification'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotification(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <Notification />
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm