import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedInInfo from './components/LoggedInInfo'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const content = () => {
        if (user === null) {
            return (
                <div>
                    <h2>Log in to app</h2>

                </div>
            )
        } else {
            return (
                <div>
                    <h2>Blogs</h2>
                    <p>Logged in as {user.username}</p>
                    <br></br>
                    {user !== null && blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </div>
            )
        }

    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
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
            {user !== null && <LoggedInInfo user={user}/> }
            {user !== null && <BlogList blogs={blogs}/> }

        </div>
    )
}

export default App