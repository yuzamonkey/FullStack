import React from 'react'
import { useSelector } from 'react-redux'

const User = ({user}) => {
  const blogs = useSelector(state => state.blogs)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
      {blogs.map(blog => 
        blog.user.id === user.id
        ? <li>{blog.title}</li>
        : null
        )}
      </ul>
    </div>
  )
}

export default User