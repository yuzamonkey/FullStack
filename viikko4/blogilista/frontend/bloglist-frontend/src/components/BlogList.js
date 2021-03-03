import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, addBlog, blogFormRef }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm
          postBlog={addBlog}
        />
      </Togglable>
      <div>
        {blogs.map(blog => <p className="blog" key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></p>)}
      </div>
    </div>
  )
}

export default BlogList