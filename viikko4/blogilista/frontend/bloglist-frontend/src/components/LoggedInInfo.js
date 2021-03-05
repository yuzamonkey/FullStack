import React from 'react'
import userService from '../services/users'
import { logout } from '../reducers/userReducer'
import { connect } from 'react-redux'


const LoggedInInfo = (props) => {

  console.log("USER", userService.getUser())

  const handleLogout = (event) => {
    event.preventDefault()
    props.logout()
  }

  return (
    <span>&emsp;User <i>{}</i> is logged in&nbsp;
      <button onClick={handleLogout}>logout</button>
    </span>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  logout
}

const connectedLoggedInInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInInfo)



export default connectedLoggedInInfo