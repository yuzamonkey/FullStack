import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.data))
      blogService.setToken(action.data.token)
      return action.data
    case 'LOGOUT':
      window.localStorage.clear()
      blogService.deleteToken()
      return action.data
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}




export default userReducer