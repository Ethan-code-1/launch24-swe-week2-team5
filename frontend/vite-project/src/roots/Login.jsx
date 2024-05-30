import React from 'react'
import Auth from '../components/Auth'
import '../styles/Login.css'

export const Login = () => {
  return (
    <div className="auth-container">
      <div className="gradientBorder">
        <div className="innerAuthContainer">
          <h1 className = 'spotimyHeader'>SpotiMy
            <img src="/spotifyIcon.png" alt="spotify icon" style={{ maxWidth: '50px', height: 'auto', marginLeft: '10px' }} />
          </h1>
          <br></br>
          
          <p className="subheading">Log in and start exploring music!</p>

          <hr className="loginpagehr"/>

          <br></br>
          <br></br>

          <Auth/>
        </div>
      </div>
    </div>
  )
}

export default Login;
