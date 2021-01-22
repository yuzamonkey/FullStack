const Filter = ({ onFilterChange }) => {
  return (
    <div>
      find countries <input onChange={(event) => onFilterChange(event.target.value)} />
    </div>
  )
}

export default Filter