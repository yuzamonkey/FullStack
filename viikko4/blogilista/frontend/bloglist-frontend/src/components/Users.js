import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  if (!users) {
    return null
  } else {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.map(user =>
            <tr>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </table>
      </div>
    )
  }
}

export default Users