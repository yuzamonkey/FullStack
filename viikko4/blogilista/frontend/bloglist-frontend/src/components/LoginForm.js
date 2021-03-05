import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    props.login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div class="container loginForm">
      <h2>Log in to app from LoginForm</h2>
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
          <div class="loginButton">
            <Button variant="primary" type="submit">Login</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  login
}

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)


export default ConnectedLogin


