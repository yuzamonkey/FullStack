

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

export const showNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
        data: {}
      })
    }, time * 1000)
  }

}


export default notificationReducer