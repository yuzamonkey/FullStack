import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { addBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    props.addBlog(blogObject)
    props.showNotification('Added new blog', 5)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <div>
      <h2>New blog here</h2>
      <form onSubmit={addBlog}>
        title
          <input id='title' type="text" value={newTitle} name="Title" onChange={({ target }) => setNewTitle(target.value)} />
        <br></br>
          author
          <input id='author' type="text" value={newAuthor} name="Author" onChange={({ target }) => setNewAuthor(target.value)} />
        <br></br>
          url
          <input id='url' type="text" value={newUrl} name="Url" onChange={({ target }) => setNewUrl(target.value)} />
        <br></br>
        <button id="createBlog" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  postBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  addBlog,
  showNotification
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm
