import React from 'react'
import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const notification = useSelector(state => state.notifications.content)
  if (!notification) return null
  return (
    <div className="error notification">
      {notification}
    </div>
  )
}
export default ErrorNotification