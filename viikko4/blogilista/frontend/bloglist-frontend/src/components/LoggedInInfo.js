import React from 'react'

const LoggedInInfo = ({user, handleLogout}) => {
    return (
        <span>&emsp;User <i>{user.name}</i> is logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
        </span>
    )
}

export default LoggedInInfo