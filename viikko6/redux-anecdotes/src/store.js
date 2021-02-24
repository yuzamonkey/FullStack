import { createStore, combineReducers, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store