import React from 'react'
//kesken

const CommentForm = () => {
  const doStuff = (e) => {
    e.preventDefault()
    console.log("SEND FORM", e.target)
  }
  return (
    <div>
      <form onSubmit={doStuff}>
        <input type="text" />
        <input type="submit" value="add comment"/>
      </form>

    </div>
  )
}

export default CommentForm