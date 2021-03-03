import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users, blogs }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {blogs.map(blog => 
        blog.user.id === user.id
        ? <p>{blog.title}</p>
        : null
        )}
    </div>
  )
}

export default User