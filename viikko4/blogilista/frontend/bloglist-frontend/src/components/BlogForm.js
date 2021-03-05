import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const BlogForm = (props) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        console.log("addblog called")
        event.preventDefault()
        props.postBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        props.showNotification('Added new blog', 5)
    }


    return (
        <div>
            
            <h2>New blog here</h2>
            <form onSubmit={addBlog}>
                title
                <input
                    id='title'
                    type="text"
                    value={newTitle}
                    name="Title"
                    onChange={({ target }) => setNewTitle(target.value)}
                />
                <br></br>
                author
                <input
                    id='author'
                    type="text"
                    value={newAuthor}
                    name="Author"
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
                <br></br>
                url
                <input
                    id='url'
                    type="text"
                    value={newUrl}
                    name="Url"
                    onChange={({ target }) => setNewUrl(target.value)}
                />
                <br></br>
                <button id="createBlog" type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    postBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {return{}}

const mapDispatchToProps = {
  showNotification
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm) 

export default ConnectedBlogForm
