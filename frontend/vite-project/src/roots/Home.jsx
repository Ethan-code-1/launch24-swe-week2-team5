import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Auth from '../components/Auth'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState('');
  /* After redirecting to Home set useContext variables */
  const { userData, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  

  return (
    <div>
      
    </div>
  );
};

export default Home;
