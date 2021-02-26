import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}
const deleteToken = () => {
    token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = async (id, newObject) => {
    return await axios.put(`${baseUrl}/${id}`, newObject)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    console.log("TÄÄLLÄ OLLAAN")
    const response = await axios.post(baseUrl, newObject, config)
    console.log("CREATE RESPONSE", response.status)
    return response.data
}

const deleteBlog = (id) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, deleteToken, getAll, getById, update, create, deleteBlog }