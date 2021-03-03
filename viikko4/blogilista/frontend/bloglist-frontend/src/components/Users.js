import React from 'react'

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </table>
      </div>
    )
  }
}

export default Users