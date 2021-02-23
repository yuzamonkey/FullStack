import React from 'react'
import { addFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(addFilter(event.target.value))
  }

  return (
    <div>
      Filter: <input onChange={handleChange}></input>
    </div>
  )

}

export default Filter