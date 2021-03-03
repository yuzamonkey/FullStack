import React from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  if (!blog) { 
    return null 
  }

  const url = String(`${blog.url}`)
  console.log("URL", url)

  const submitHandle = e => {
    e.preventDefault()
    window.location.replace(`https://${url}`)
  }
  return (
    <div id="blog">
      <h2>{blog.title}, {blog.author}</h2>

      <p><a href="www.wikipedia.org" onClick={submitHandle}>{blog.url}</a> <br></br>
      likes: <span className="likeCount">{blog.likes}</span> <button onClick={() => addLike(blog)}>like</button><br></br>
      added by: {blog.user.name} <br></br></p>
      {user.name === blog.user.name
        ? <button onClick={deleteBlog} value={blog.id}>delete</button>
        : null
      }

    </div>
  )

}

export default Blog
