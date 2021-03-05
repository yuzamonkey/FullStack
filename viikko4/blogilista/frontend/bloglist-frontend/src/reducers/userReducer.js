import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.data))
      blogService.setToken(action.data.token)
      userService.setUser(action.data)
      return action.data
    case 'LOGOUT':
      window.localStorage.clear()
      blogService.deleteToken()
      userService.deleteUser()
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



export default userReducer