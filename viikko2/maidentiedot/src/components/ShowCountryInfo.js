const ShowCountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="200"/>
        </div>
    )
}
export default ShowCountryInfo