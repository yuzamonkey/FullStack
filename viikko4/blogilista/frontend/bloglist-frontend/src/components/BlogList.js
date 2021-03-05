import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, blogFormRef }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Table striped hover>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList