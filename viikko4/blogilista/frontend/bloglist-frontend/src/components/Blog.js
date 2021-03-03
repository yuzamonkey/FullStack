import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    if (blog) {
    blogService
      .getComments(blog.id)
      .then(response => setComments(response))
    }
  }, [blog])

  if (!blog) {
    return null
  }

  const submitHandle = e => {
    e.preventDefault()
    window.location.replace(`https://${blog.url}`)
  }

  return (
    <div id="blog">
      <h2>{blog.title}, {blog.author}</h2>
      <p><a href="" onClick={submitHandle}>{blog.url}</a> <br></br>
      likes: <span className="likeCount">{blog.likes}</span> <button onClick={() => addLike(blog)}>like</button><br></br>
      added by: {blog.user.name} <br></br></p>
      <h3>comments</h3>
      <CommentForm />
      <ul>
        {comments.map(c => <li>{c.comment}</li>)}
      </ul>
      {/* {user.name === blog.user.name
        ? <button onClick={deleteBlog} value={blog.id}>delete</button>
        : null
      } */}
    </div>
  )

}

export default Blog
