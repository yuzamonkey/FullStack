const notificationReducer = (state = 'HIDE', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

let previousTimeoutID = -1
export const showNotification = (content, time) => {
  clearTimeout(previousTimeoutID)
  return async dispatch => {
    const show = () => {
      dispatch({
        type: 'SHOW',
        data: { content }
      })
    }
    const hide = () => {
      dispatch({
        type: 'HIDE',
        data: {}
      })
    }
    show()
    const timeoutID = setTimeout(hide, time*1000)
    previousTimeoutID = timeoutID 
  }
}


export default notificationReducer