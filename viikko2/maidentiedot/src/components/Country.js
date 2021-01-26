import { useState, useEffect } from 'react'
import axios from 'axios'

export const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(undefined)
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="200" alt="flag" />
      {(weatherData !== undefined) &&
        <div>
          <h3>Weather in {country.capital}</h3>
          <p><b>temperature: </b>{weatherData.current.temperature} Celcius</p>
          <img src={weatherData.current.weather_icons[0]} alt="weatherpic" />
          <p><b>wind: </b>{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
        </div>
      }
    </div>
  )
}