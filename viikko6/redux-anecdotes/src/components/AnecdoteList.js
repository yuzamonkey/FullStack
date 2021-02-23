import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

import Notification from './Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(showNotification(`You voted for "${anecdotes.find(a => a.id === id).content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      <Notification />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList