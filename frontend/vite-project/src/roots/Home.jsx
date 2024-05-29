import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Auth from '../components/Auth'

const Home = () => {
  const [messages, setMessages] = useState([]);
    const [id, setId] = useState('');
  /* After redirecting to Home set useContext variables */
  const { userData, login, logout } = useContext(AuthContext);
  
  
  useEffect(() => {
    if (userData === null) {
      const urlParams = new URLSearchParams(window.location.search);
      const access_token = urlParams.get("access_token");
      const refresh_token = urlParams.get("refresh_token");
      const id = urlParams.get("id");
      const error = urlParams.get("error");

      setId(id);

      if (error) {
        alert("There was an error during the authentication");
      } else if (access_token) {
        login({ access_token, refresh_token, id });
        console.log({ access_token, refresh_token, id });
      }
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5001/test");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={fetchMessages}>Fetch Messages</button>
      <Auth/>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.name}</li>
        ))}
      </ul>
      {userData ? <button onClick={() => logout({id})}>logout</button>: null}
    </div>
  );
};

export default Home;
