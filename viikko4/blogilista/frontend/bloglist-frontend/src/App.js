import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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

  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  const [successMessage, setSuccessMessage] = useState(null)
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

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blog)
      const all = await blogService.getAll()
      setBlogs(all.sort((a, b) => b.likes - a.likes))
      setSuccessMessage(`New blog '${blog.title}' added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Could not send blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    blog.likes += 1
    await blogService.update(blog.id, blog)
    const all = await blogService.getAll()
    setBlogs(all.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    const blogId = event.target.value
    console.log(blogId)
    const confirm = window.confirm(`DELETE BLOG?`)
    if (confirm) {
      console.log("DELETE CONFIRMED")
      blogService.deleteBlog(blogId).then(response => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )
      })
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
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
    )
  } else {
    return (
      <div>
        <Menu user={user} handleLogout={handleLogout} />
        <SuccessNotification />
        <ErrorNotification />
        <Switch>
          <Route path='/users/:id'>
            <User user={userInfo} blogs={blogs}/>
          </Route>
          <Route path='/users'>
            <Users users={users}/>
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blogInfo} addLike={addLike} deleteBlog={deleteBlog} user={user} />
          </Route>
          <Route path='/blogs'>
            <BlogList blogs={blogs} addBlog={addBlog} blogFormRef={blogFormRef}/>
          </Route>
          <Route path='/'>
            <BlogList blogs={blogs} addBlog={addBlog} blogFormRef={blogFormRef}/>
          </Route>
        </Switch>
      </div>
    )
  }


}

export default App