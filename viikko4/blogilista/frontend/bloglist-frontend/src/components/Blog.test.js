import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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