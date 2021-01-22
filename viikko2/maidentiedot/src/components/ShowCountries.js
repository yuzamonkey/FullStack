import { useState } from 'react'
import ShowCountryInfo from './ShowCountryInfo'

const ShowCountries = ({ data, filter }) => {
  const filtered = data.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  const length = filtered.length

  if (length === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
    )
  }
  else if (length === 1) {
    const countryObject = filtered[0]
    return (
      <ShowCountryInfo country={countryObject} />
    )
  }
  else if (length > 1 && length <= 10) {
    return (
      <div>
        {filtered.map(country =>
            <p key={country.name}>{country.name} <button onClick={() => {console.log(country)}}>show</button></p>
        )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, please specify</p>
      </div>
    )
  }




}
export default ShowCountries
