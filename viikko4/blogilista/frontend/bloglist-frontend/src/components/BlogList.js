import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, addLike, deleteBlog, user}) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user}/>)}
        </div>
    )
}

export default BlogList