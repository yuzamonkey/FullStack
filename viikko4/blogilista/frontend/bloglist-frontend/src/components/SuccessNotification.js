import React from 'react'
import { useSelector } from 'react-redux'

const SuccessNotification = () => {
  const notification = useSelector(state => state.notifications.content)
  if (!notification) return null
  return (
    <div className="success notification">
      {notification}
    </div>
  )
}
export default SuccessNotification
