import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const localData = useSelector(state => state)
  console.log("local data", localData)

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
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
  }
  return (
    <div>
      <div className="menu">
        <Menu user={user} />
      </div>
      <div className="container home">
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User user={userInfo} />
          </Route>
          <Route path='/users'>
            <Users users={users} />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blogInfo} user={user} />
          </Route>
          <Route path='/blogs'>
            <BlogList blogFormRef={blogFormRef} />
          </Route>
          <Route path='/'>
            <BlogList blogFormRef={blogFormRef} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App