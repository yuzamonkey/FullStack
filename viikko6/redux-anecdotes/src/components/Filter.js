import React from 'react'
import { addFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.addFilter(event.target.value)
  }

  return (
    <div>
      Filter: <input onChange={handleChange}></input>
    </div>
  )

}

const mapStateToProps = (state) => {}

const mapDispatchToProps = {
  addFilter
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter