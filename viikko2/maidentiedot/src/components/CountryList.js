import { Country } from './Country'

export const CountryList = ({ countries, onSelect }) => {
  if (countries.length === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
    )
  }
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(country =>
            <p key={country.name}>{country.name} <button onClick={() => onSelect(country)}>show</button></p>
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