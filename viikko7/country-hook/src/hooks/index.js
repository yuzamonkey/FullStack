//Hooks
import { useState, useEffect } from 'react'
import axios from 'axios'

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getData = async () => {
      console.log("GETTING DATA WITH", name)
      const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      setCountry(response.data[0])
    }
    getData()
  }, [name])

  return country
}