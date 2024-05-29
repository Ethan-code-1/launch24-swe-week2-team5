import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = () => {
  return (
    <div className="container">
      <div id="login">
        <h1>Log in with Spotify</h1>
        <button className="btn btn-primary">
            <a href='http://localhost:5001/spotify/login'>Login</a>
        </button>
      </div>
    </div>
  );
};

export default Auth;
