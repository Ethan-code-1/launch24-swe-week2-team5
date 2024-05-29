import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Inbox.css';
import PersonIcon from '@mui/icons-material/Person'; 


export const Inbox = () => {
  const [mode, setMode] = useState('yourPosts'); 
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]); 

  async function fetchAllPosts() {
    const res = (await axios.get("http://localhost:5001/inbox")).data;
    setMessages(res);
  }

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleToggle = (newMode) => {
    setMode(newMode);
    if (newMode === 'yourPosts' && messages.length > 0) {
      setSelectedMessage(messages[0]);
    }
  };

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
                  <h3>{selectedMessage.Title}</h3>
                  <h5>{selectedMessage.Content}</h5>
                </>
              ) : <p>Your message inbox is empty!</p>}
              
            </div>
          </div>
              
        ) : (
          <div className="postsOutsideContainer">
            <h3>Draft Message</h3>
            <hr className="forumPageHr" />
            <form>
              <input id="recipField" type="text" placeholder="To" className="inputField"/>
              <input id="titleField" type="text" placeholder="Title" className="inputField"/>
              <textarea id="contentField" placeholder="Content" className="inputField"/>
              <button id="submitForum" type="submit" className="submitButton">Send Message</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
