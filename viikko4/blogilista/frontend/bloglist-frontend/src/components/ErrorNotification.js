import React from 'react'
const ErrorNotification = ({message}) => {
    if (message === null) return null
    return (
        <div id="notification" className="error notification">
            {message}
        </div>
    )
}
export default ErrorNotification