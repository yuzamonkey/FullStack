import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import { CountryList } from './components/CountryList'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [visibleCountries, setVisibleCountries] = useState([])

  const url = "https://restcountries.eu/rest/v2/all"
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const updateVisibleCountries = (searchTerm) => {
    setVisibleCountries(allCountries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }

  return (
    <div>
      <Filter onFilterChange={searchTerm => updateVisibleCountries(searchTerm)} />
      <CountryList countries={visibleCountries} onSelect={selectedCountry => setVisibleCountries([selectedCountry])}/>
    </div>
  );
}

export default App;
