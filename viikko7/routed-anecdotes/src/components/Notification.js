import React from 'react'

const Notification = ({ content }) => {
  const style = {
    border: "1px solid blue",
    padding: 5
  }
  if (content) {
    return (
      <div>
        <p style={style}>{content}</p>
      </div>
    )
  } else {
    return (<></>)
  }

}

export default Notification