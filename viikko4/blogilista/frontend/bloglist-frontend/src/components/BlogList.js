import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({blogs}) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(blog => <p className="blog"><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></p>)}
        </div>
    )
}

export default BlogList