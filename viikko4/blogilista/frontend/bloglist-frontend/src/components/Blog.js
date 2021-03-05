import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

import { addLike } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = (props) => {
  const dispatch = useDispatch()

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")

  useEffect(() => {
    if (props.blog) {
      blogService
        .getComments(props.blog.id)
        .then(response => setComments(response))
    }
  }, [props.blog])

  if (!props.blog) {
    return null
  }

  const handleLike = (id) => {
    dispatch(addLike(id))
  }

  const handleDeletion = (id) => {
    const confirm = window.confirm(`DELETE BLOG?`)
    if (confirm) {
      dispatch(deleteBlog(id))
    }
  }

  const handleLink = e => {
    e.preventDefault()
    window.location.replace(`https://${props.blog.url}`)
  }

  const handleComment = (e) => {
    e.preventDefault()
    const commentObject = {
      comment: comment
    }
    blogService.createComment(props.blog.id, commentObject)
    setComments(comments.concat(commentObject))
    setComment("")
  }

  return (
    <div id="blog">
      <h2>{props.blog.title}, {props.blog.author}</h2>
      <p><a href={props.blog.url} onClick={handleLink}>{props.blog.url}</a> <br></br>
      likes: <span className="likeCount">{props.blog.likes}</span> <button onClick={() => handleLike(props.blog.id)}>like</button><br></br>
      added by: {props.blog.user.name} <br></br></p>

      <h3>comments</h3>
      <div>
        <form onSubmit={handleComment}>
          <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          <input type="submit" value="add comment" />
        </form>
      </div>
      <ul>
        {comments.map(c => <li key={c.id}>{c.comment}</li>)}
      </ul>
      {props.user.name === props.blog.user.name
        ? <button onClick={() => handleDeletion(props.blog.id)}>delete</button>
        : null
      }
    </div>
  )

}
export default Blog