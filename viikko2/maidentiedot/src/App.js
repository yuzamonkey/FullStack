import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log("hook method")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log('promise fulfilled', response.data)
        setData(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <ShowCountries data={data} filter={filter} />
    </div>
  );
}

export default App;
