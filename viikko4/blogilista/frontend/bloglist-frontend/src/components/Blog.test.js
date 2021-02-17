import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 123,
        user: {
            name: 'test user.name'
        }
    }

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