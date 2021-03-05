import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Notification from './Notification'

const LoginForm = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username, password))
      history.push('/')
      window.location.reload()
    } catch {
      dispatch(showNotification('Wrong username or password', 5))
      setUsername('')
      setPassword('')
    }
   
  }

  return (
    <div className="container loginForm">
      <h2>Log in to app from LoginForm</h2>
      <Notification/>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          <div className="button">
            <Button variant="primary" type="submit">Login</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm


