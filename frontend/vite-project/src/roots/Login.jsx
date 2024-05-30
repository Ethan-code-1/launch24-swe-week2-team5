import React, { useEffect, useRef } from 'react';
import Auth from '../components/Auth';
import '../styles/Login.css';

export const Login = () => {
  const authContainerRef = useRef(null);

  useEffect(() => {
    const authContainer = authContainerRef.current;
    if (authContainer) {
      authContainer.classList.add('fade-in');
    }
  }, []);

  return (
    <div ref={authContainerRef} className="auth-container">
      <div className="gradientBorder">
        <div className="innerAuthContainer">
          <h1 className='spotimyHeader'>SpotiMy
            <img src="/spotifyIcon.png" alt="spotify icon" style={{ maxWidth: '80px', height: 'auto', marginLeft: '10px' }} />
          </h1>
          <br />
          
          <p className="subheading">Log in to start chatting with others and build your own music community!</p>

          <hr className="loginpagehr" />

          <br />
          <br />

          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Login;
