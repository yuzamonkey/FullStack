import React, { useState } from 'react'


const Blog = ({ blog, addLike, deleteBlog, user }) => {
    const [showAll, setShowAll] = useState(false)

    const changeView = () => {
        setShowAll(!showAll)
    }

    if (showAll) {
        return (
            <div id="blog" className="blog">
                {blog.title} {blog.author} <button onClick={changeView}>hide</button> <br></br>
                {blog.url} <br></br>
                <p>likes: <span className="likeCount">{blog.likes}</span> <button onClick={() => addLike(blog)}>like</button></p>
                {blog.user.name} <br></br>
                {user.name === blog.user.name
                    ? <button onClick={deleteBlog} value={blog.id}>delete</button>
                    : null
                }

            </div>
        )
    } else {
        return (
            <div id="blog" className="blog">
                <div>
                    {blog.title} {blog.author} <button onClick={changeView}>view</button>
                </div>
            </div>
        )
    }
}

export default Blog
