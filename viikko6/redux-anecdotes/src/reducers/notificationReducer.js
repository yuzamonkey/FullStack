

const notificationReducer = (state = 'HIDE', action) => {
  switch (action.type) {
    case 'SHOW':
      console.log("SHOW NOTIFICATION")
      return action.data
    case 'HIDE':
      console.log("HIDE NOTIFICATION")
      return action.data
    default:
      return state
  }
}

export const showNotification = (content) => {
  return {
    type: 'SHOW',
    data: {content}
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: {}
  }
}

export default notificationReducer