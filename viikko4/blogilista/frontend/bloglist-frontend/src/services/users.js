import axios from 'axios'
const baseUrl = '/api/users'

let user = null

const getUser = () => {
  return user
}

const setUser = loggedInUser => {
  user = loggedInUser
}
const deleteUser = () => {
  user = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getUser, setUser, deleteUser, getAll }