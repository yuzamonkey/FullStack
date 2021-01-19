const ShowPersons = ({ persons, filter }) => {
    return (
        <div>
            <ul>
                {persons.map(person => {
                    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
                        return <p>{person.name} {person.number}</p>
                    } return <p></p>
                })}
            </ul>
        </div>
    )
}

export default ShowPersons