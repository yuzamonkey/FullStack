import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { login } from '../reducers/userReducer'
import { connect } from 'react-redux'

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
    <div>
      <h2>Log in to app from LoginForm</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
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


