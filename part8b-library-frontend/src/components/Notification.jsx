import React from 'react'

const Notification = ({notification}) => {
  if (!notification?.message) return null

  const style = {
    border: '1px solid red',
    color: notification.type === 'ERROR' ? 'red' : 'blue',
  }

  return (
    <div>
      <p style={style}>{notification.message}</p>
    </div>
  )
}

export default Notification
