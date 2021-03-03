import React from 'react'
import { Link } from 'react-router-dom'
import LoggedInInfo from './LoggedInInfo'

const Menu = ({user, handleLogout}) => {

  const padding = {
    padding: 5,
    backgroundColor: "lightgray"
  }
  return (
    <div style={padding}>
      <Link to='/blogs' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <LoggedInInfo user={user} handleLogout={handleLogout}/>
    </div>
  )
}
export default Menu