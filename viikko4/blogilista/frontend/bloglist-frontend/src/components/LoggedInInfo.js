import React from 'react'
import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoggedInInfo = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    history.push('/')
    window.location.reload()
  }

  return (
    <span>&emsp;<i>{user.name}</i> is logged in&nbsp;
      <button onClick={handleLogout}>logout</button>
    </span>
  )
}


export default LoggedInInfo