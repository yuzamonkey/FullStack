import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedInInfo from './components/LoggedInInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import SuccessNotification from './components/SuccessNotification'
import loginService from './services/login'

import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const blogFormRef = useRef()

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a,b) => b.likes - a.likes))
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

    const addBlog = (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            blogService
                .create(blog)
                .then(returnedBlog => {
                    blogService.getAll().then(blogs =>
                        setBlogs(blogs.sort((a,b) => b.likes - a.likes))
                    )
                })
            
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

    const addLike = (event) => {
        event.preventDefault()
        const blogId = event.target.value
        blogService.getById(blogId).then(blog => {
            blog.likes += 1
            blogService.update(blogId, blog)
            blogService.getAll().then(blogs =>
                setBlogs(blogs.sort((a,b) => b.likes - a.likes))
            )
        })

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
                    setBlogs(blogs.sort((a,b) => b.likes - a.likes))
                )
            })
        }
    }


    return (
        <div>
            {user === null &&
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    errorMessage={errorMessage}
                />}
            {user !== null && <LoggedInInfo user={user} handleLogout={handleLogout} />}
            <SuccessNotification message={successMessage} />
            {user !== null &&
                <Togglable buttonLabel='create blog' ref={blogFormRef}>
                    <BlogForm
                        postBlog={addBlog}
                        successMessage={successMessage}
                    />
                </Togglable>
            }
            {user !== null && <BlogList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} user={user}/>}
        </div>
    )
}

export default App