const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(a => a.id === action.data.id)
      const changedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : changedAnecdote
      )
      const sorted = newState.sort((a, b) => b.votes - a.votes)
      return sorted
    case 'ADD_ANECDOTE':
      return state.concat(action.content)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    content
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}


export default anecdoteReducer