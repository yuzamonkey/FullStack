import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedInInfo from './components/LoggedInInfo'
import CreateBlog from './components/CreateBlog'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
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
            setErrorMessage('wrong credentials')
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
        } catch (exception) {
            console.log("SOMETHING WRONG", exception)
        }
    }

    const addNewBlog = (event) => {
        event.preventDefault()
        console.log(newTitle, newAuthor, newUrl)
        const blog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        const response = blogService.create(blog)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
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
            {user !== null && <LoggedInInfo user={user} handleLogout={handleLogout}/> }
            {user !== null && <BlogList blogs={blogs}/> }
            {user !== null && <CreateBlog 
                addNewBlog={addNewBlog}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newAuthor={newAuthor}
                setNewAuthor={setNewAuthor}
                newUrl={newUrl}
                setNewUrl={setNewUrl}
                />}
        </div>
    )
}

export default App