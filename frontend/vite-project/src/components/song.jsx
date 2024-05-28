import React from 'react'
import pic from '../assets/profile-pic.webp'

const Song = (data) => {
  return (
    <div>
        <img src={pic} alt="song"/>
        <h4>{data.name}</h4>
    </div>
    
  )
}

export default Song