import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import userService from './services/users'

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
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div>
        <div class="menu">
          <Menu />
        </div>
        <div class="container home">
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
      </div>
    )
  }


}

export default App