import blogService from '../services/blogs'

const blogRedurer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const addLike = id => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToChange = blogs.find(a => a.id === id)
    const changedBlog = {
      ...blogToChange, votes: blogToChange.votes + 1
    }
    await blogService.addVote(id, changedBlog)
    const updatedBlogs = await blogService.getAll()
    const sorted = updatedBlogs.sort((a,b) => b.votes - a.votes)
    dispatch({
      type: 'VOTE',
      data: sorted
    })
  }
}

export const addBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: sorted
    })
  }
}

export default blogRedurer