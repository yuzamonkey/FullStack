import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return action.data
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...anecdoteToChange, votes: anecdoteToChange.votes + 1
    }
    await anecdoteService.addVote(id, changedAnecdote)
    const updatedAnecdotes = await anecdoteService.getAll()
    const sorted = updatedAnecdotes.sort((a,b) => b.votes - a.votes)
    dispatch({
      type: 'VOTE',
      data: sorted
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sorted = anecdotes.sort((a,b) => b.votes - a.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sorted
    })
  }
}

export default anecdoteReducer