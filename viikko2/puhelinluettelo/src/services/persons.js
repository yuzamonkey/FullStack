import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://mysterious-reef-29772.herokuapp.com/'
//const baseUrl = '/api/persons' //suhteellinen url, sillä front- ja backend toimivat samassa osoitteessa

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
     return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }