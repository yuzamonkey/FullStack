import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import SuccessNotification from './components/SuccessNotification'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'


import './index.css'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => setUsers(response))
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log(window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log("LOGGIN OUT")
    try {
      window.localStorage.clear()
      blogService.deleteToken()
      setUser(null)
    } catch (exception) {
      console.log("SOMETHING WRONG", exception)
    }
  }


  const userMatch = useRouteMatch('/users/:id')
  const userInfo = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogInfo = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (!user) {
    return (
      <div>
        <ErrorNotification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Menu user={user} handleLogout={handleLogout} />
        <SuccessNotification />
        <ErrorNotification />
        <Switch>
          <Route path='/users/:id'>
            <User user={userInfo} blogs={blogs} />
          </Route>
          <Route path='/users'>
            <Users users={users} />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blogInfo} user={user} />
          </Route>
          <Route path='/blogs'>
            <BlogList blogs={blogs} blogFormRef={blogFormRef} />
          </Route>
          <Route path='/'>
            <BlogList blogs={blogs} blogFormRef={blogFormRef} />
          </Route>
        </Switch>
      </div>
    )
  }


}

export default App