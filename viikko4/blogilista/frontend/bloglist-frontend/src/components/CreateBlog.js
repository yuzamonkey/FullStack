import React from 'react'

const CreateBlog = ({addNewBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl}) => {
    return (
        <div>
            <h2>New blog here</h2>
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