import ShowCountryInfo from './ShowCountryInfo'

const ShowCountries = ({ data, filter }) => {
    const filtered = data.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    const length = filtered.length

    if (length === 0) {
        return (
            <div>
                No matches
            </div>
        )
    }
    else if (length === 1) {
        const countryObject = filtered[0]
        console.log(countryObject)
        return (
            <ShowCountryInfo country={countryObject} />
        )
    }
    else if (length > 1 && length <= 10) {
        return (
            <div>
                {filtered.map(country => <p key={country.name}>{country.name}</p>)}
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
//TOIMII, mutta kokeillaan vielä
    // const names = data.map(country => country.name)
    // const filtered = names.filter(country => country.toLowerCase().includes(filter.toLowerCase()))

    // if (filtered.length === 1) {
    //     return (
    //         <div>
    //             <p>One match {filtered}</p>
    //         </div>
    //     )
    // }
    // else if (filtered.length > 1 && filtered.length <= 10) {
    //     return (
    //         <div>
    //             {filtered.map(country => <p key={country}>{country}</p>)}
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div>
    //             <p>Too many matches, specify another filter</p>
    //         </div>
    //     )
    // }