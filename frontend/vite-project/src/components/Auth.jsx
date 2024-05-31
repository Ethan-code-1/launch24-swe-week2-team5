import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Auth = () => {
  return (
    <>

        <h1>Log in with Spotify</h1>
        <button style={{
            background: "linear-gradient(100deg, #8A2BE2, #FF00FF)", 
            color: "white", 
            width: "75%", 
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            textDecoration: "none",
            marginTop: "2em",

        }}>
            <a href='http://localhost:5001/spotify/login' style={{color: "white", textDecoration: "none"}}>Login</a>
        </button>

    </>
  );
};


export default Auth;
