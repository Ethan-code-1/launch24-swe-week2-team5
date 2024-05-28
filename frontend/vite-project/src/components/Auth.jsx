import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  useEffect(() => {
    const params = getHashParams();
    const { access_token, refresh_token, error } = params;

    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
      }
    }
  }, []);

  const getHashParams = () => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e;
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };


  return (
    <div className="container">
      <div id="login" style={{ display: accessToken ? 'none' : 'block' }}>
        <h1>Log in with Spotify</h1>
        <button className="btn btn-primary">
            <a href='http://localhost:5001/spotify/login'>Login</a>
        </button>
      </div>
    </div>
  );
};

export default Auth;
