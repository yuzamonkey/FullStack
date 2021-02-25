import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

import Notification from './Notification'

const AnecdoteList = (props) => {

  const vote = (id) => {
    console.log('vote', id)
    props.addVote(id)

    props.showNotification(`You voted for "${props.anecdotes.find(a => a.id === id).content}"`, 5)
  }

  return (
    <div>
      <Notification />
      <Filter />
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(
      anecdote => anecdote.content.includes(state.filter)
    )
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
  
export default ConnectedAnecdotes