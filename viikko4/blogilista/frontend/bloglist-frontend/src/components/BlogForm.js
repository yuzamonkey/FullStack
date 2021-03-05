import React, { useState } from 'react'
import { addBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    dispatch(addBlog(blogObject))
    dispatch(showNotification('Added new blog', 5))
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <Form onSubmit={handleBlogSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)} />
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)} />
          <div class="button">
            <Button variant="primary" type="submit">Create</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
