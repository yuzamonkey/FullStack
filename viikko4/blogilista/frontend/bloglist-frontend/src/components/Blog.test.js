import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 123,
    user: {
        name: 'test user.name'
    }
}

test('renders title and author but not url and likes', () => {
    const component = render(
        <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
        'test title', 'test view'
    )
    expect(component.container).not.toHaveTextContent(
        'test url', 'likes'
    )
})

test('clicking the view button shows url and likes', () => {
    const component = render (
        <Blog blog={blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
        'test url', 'likes'
    )

})

test('clicking like twice calls function twice', () => {
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} addLike={mockHandler}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

})

test('creating new blog sends correct params when blog is created', () => {
    const mockHandler = jest.fn()
    const component = render(
        <BlogForm postBlog={mockHandler} successMessage='' />
    )
    
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    //kesken, en tiedä miten asettaisin kenttiin arvoja
    title.value = 'blaa'
    title.setAttribute('title', 'blaa')
    title.innerHTML = "blaa"
    console.log("TITLE", title)


    
    const createButton = component.getByText('create')
    fireEvent.click(createButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    console.log("MOCKHANDLER MOCKS", mockHandler.mock)
    
})