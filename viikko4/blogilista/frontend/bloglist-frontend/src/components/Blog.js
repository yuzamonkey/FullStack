import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")

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

  const handleLink = e => {
    e.preventDefault()
    window.location.replace(`https://${blog.url}`)
  }

  const handleComment = (e) => {
    e.preventDefault()
    console.log("SEND FORM", comment)
    const commentObject = {
      comment: comment
    }
    blogService.createComment(blog.id, commentObject)
    setComments(comments.concat(commentObject))
    setComment("")
  }

  return (
    <div id="blog">
      <h2>{blog.title}, {blog.author}</h2>
      <p><a href={blog.url} onClick={handleLink}>{blog.url}</a> <br></br>
      likes: <span className="likeCount">{blog.likes}</span> <button onClick={() => addLike(blog)}>like</button><br></br>
      added by: {blog.user.name} <br></br></p>
      
      <h3>comments</h3>
      <div>
        <form onSubmit={handleComment}>
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          <input type="submit" value="add comment" />
        </form>
      </div>
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
