import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const url = "https://restcountries.eu/rest/v2/all"

  const hook = () => {
    axios
      .get(url)
      .then(response => {
        setData(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
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
