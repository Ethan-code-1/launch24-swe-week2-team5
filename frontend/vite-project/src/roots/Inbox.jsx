import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Inbox.css';
import PersonIcon from '@mui/icons-material/Person'; 
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

export const Inbox = () => {
  const [mode, setMode] = useState('yourPosts'); 
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]); 
  const [newMsg, setNewMsg] = useState({});
  const [users, setUsers] = useState([]);

  const id = localStorage.getItem("id");

  async function fetchAllPosts() {
    const res = (await axios.get(`http://localhost:5001/inbox/${id}`)).data;
    console.log(res);
    setMessages(res);
    if (res.length > 0) setSelectedMessage(res[0]); 
  }

  async function fetchAllUsers() {
    console.log("hellooo");
    const res = (await axios.get(`http://localhost:5001/inbox/draft/${id}`)).data;
    console.log(res);
    setUsers(res);
  }

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleToggle = (newMode) => {
    setMode(newMode);
    if (newMode === 'yourPosts' && messages.length > 0) {
      setSelectedMessage(messages[0]);
    } else {
      fetchAllUsers();
    }
  };

  const handleDelete = async () => {
    const msgId = selectedMessage["id"];
    const res = (await axios.delete(`http://localhost:5001/inbox/${id}/${msgId}`)).data;
    console.log(res);
    fetchAllPosts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:5001/inbox/${id}`, newMsg);
    console.log(res);
    location.reload();
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
        <h1>Inbox</h1>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleToggle('yourPosts');
            }}
            className={`toggle-link ${mode === 'yourPosts' ? 'active' : ''}`}
          >
            <strong>Your Messages</strong>
          </a>
          <span className="separator">|</span>
          <a
            href="#"
            style = {{marginLeft: '.75vw'}}
            onClick={(e) => {
              e.preventDefault();
              handleToggle('viewAll');
            }}
            className={`toggle-link ${mode === 'viewAll' ? 'active' : ''}`}
          >
            <strong>Draft Message</strong>
          </a>
        </div>
      </div>
      <div>
        {mode === 'yourPosts' ? (
          <div className="messagesLayout">
            <div className="messageList">
              {messages.map(msg => (
                <div key={msg.id} onClick={() => setSelectedMessage(msg)} className="messagePreview">
                    <div className="iconAndText">
                        <PersonIcon className="personIcon"></PersonIcon>
                        <span>
                        <strong>{msg.From}</strong>: {msg.Title.length > 20 ? msg.Title.substring(0, 17) + '...' : msg.Title}
                        </span>
                    </div>
                </div>
              ))}
            </div>
            <div className="messageSeparator"></div> 
            <div className="messageContent">
              {selectedMessage ? (
                <>
                  <div className="messageHeader">
                    <h3>Topic: {selectedMessage.Title}</h3>
                    <DeleteIcon className="deleteIcon" onClick={handleDelete} /> {/* Add the trash icon here */}
                  </div>
                  <hr className='forumPageHr'></hr>
                  <h5>From: {selectedMessage.From}</h5>
                  <br></br>
                  <h5>{selectedMessage.Content}</h5>
                </>
              ) : <p className="emptyInboxMessage">Your message inbox is empty!</p>}
            </div>
          </div>
        ) : (
          <div className="postsOutsideContainer">
            <h3>Draft Message</h3>
            <hr className="forumPageHr" />
            <form onSubmit={handleSubmit}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={users}
              color='grey'
              renderInput={(params) => <TextField {...params} label="Username" />}
              onChange={(e) => {setNewMsg({...newMsg, "to": e.target.value})}}
            />
              <input id="recipField" 
                type="text" 
                placeholder="To" 
                className="inputField" 
                onChange={(e) => {setNewMsg({...newMsg, "to": e.target.value})}}/>
              <input id="titleField" 
                type="text" 
                placeholder="Title" 
                className="inputField" 
                onChange={(e) => {setNewMsg({...newMsg, "title": e.target.value})}}/>
              <textarea id="contentField" 
                placeholder="Content" 
                className="inputField"
                onChange={(e) => {
                  setNewMsg({...newMsg, "content": e.target.value})
                }}/>
              <button id="submitForum" type="submit" className="submitButton">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
