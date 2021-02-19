import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
    const [showAll, setShowAll] = useState(false)

    const changeView = () => {
        setShowAll(!showAll)
    }


    if (showAll) {
        return (
            <div className="blog">
                {blog.title} {blog.author} <button onClick={changeView}>hide</button> <br></br>
                {blog.url} <br></br>
                likes: {blog.likes} <button onClick={addLike} value={blog.id}>like</button><br></br>
                {blog.user.name}
            </div>
        )
    }
    return (
        <div className="blog">
            {blog.title} {blog.author} <button onClick={changeView}>view</button>
        </div>
    )
}

export default Blog
