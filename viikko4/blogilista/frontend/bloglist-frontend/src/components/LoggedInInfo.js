import React from 'react'
import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'


const LoggedInInfo = (props) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <span>&emsp;User <i>{}</i> is logged in&nbsp;
      <button onClick={handleLogout}>logout</button>
    </span>
  )
}


export default LoggedInInfo