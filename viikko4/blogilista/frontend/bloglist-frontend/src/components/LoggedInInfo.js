import React from 'react'

const LoggedInInfo = ({user, handleLogout}) => {
    return (
        <p>User {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
        </p>

    )
}

export default LoggedInInfo