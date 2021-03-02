import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField()
  const author = useField()
  const info = useField()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }
  const reset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset={0}/>
        </div>
        <div>
          author
          <input {...author} reset={0}/>
        </div>
        <div>
          url for more info
          <input {...info} reset={0}/>
        </div>
        <input type="submit" value="create" />
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
