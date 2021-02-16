
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import SuccessNotification from './SuccessNotification'
//, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl
const CreateBlog = ({ postBlog, successMessage }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        console.log("addblog called")
        event.preventDefault()
        postBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }


    return (
        <div>
            <h2>New blog here</h2>
            <SuccessNotification message={successMessage} />
            <form onSubmit={addBlog}>
                title
                <input
                    type="text"
                    value={newTitle}
                    name="Title"
                    onChange={({ target }) => setNewTitle(target.value)}
                />
                <br></br>
                author
                <input
                    type="text"
                    value={newAuthor}
                    name="Author"
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
                <br></br>
                url
                <input
                    type="text"
                    value={newUrl}
                    name="Url"
                    onChange={({ target }) => setNewUrl(target.value)}
                />
                <br></br>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

CreateBlog.propTypes = {
    postBlog: PropTypes.func.isRequired
}

export default CreateBlog