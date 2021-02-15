import React from 'react'
import SuccessNotification from './SuccessNotification'

const CreateBlog = ({addNewBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl, successMessage}) => {
    return (
        <div>
            <h2>New blog here</h2>
            <SuccessNotification message={successMessage} />
            <form onSubmit={addNewBlog}>
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

export default CreateBlog