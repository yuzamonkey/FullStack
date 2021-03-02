//hooks
import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getData()
  }, [])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    console.log("PUT RESPONSE", response)
    setResources(resources.concat(resource))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
