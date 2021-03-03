import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, addBlog, ref }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create blog' ref={ref}>
        <BlogForm
          postBlog={addBlog}
        />
      </Togglable>
      <div>
        {blogs.map(blog => <p className="blog"><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></p>)}
      </div>
    </div>
  )
}

export default BlogList