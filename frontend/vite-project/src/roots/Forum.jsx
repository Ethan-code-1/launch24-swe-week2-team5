import { useState, useEffect, useContext } from 'react'
import React from 'react'
import '../styles/Forum.css';
import axios from "axios";

export const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState('');
  const [mode, setMode] = useState('viewAll');
  
  async function fetchAllPosts() {
    const res = (await axios.get("http://localhost:5001/forum")).data;
    setPosts(res);
  }

  async function fetchMyPosts() {
    const res = (await axios.get(`http://localhost:5001/forum/${id}`)).data; // Assuming 'myforum' is the route for user-specific posts
    setMyPosts(res);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
          title: title,
          content: content,
          date: Date.now()
    };
      const response = await axios.post(`http://localhost:5001/forum/${id}`, body);
      console.log(response)
      location.reload();
  }

  useEffect(() => {
    setId(localStorage.getItem('id'));
    fetchAllPosts();
    fetchMyPosts(); // Fetch user-specific posts on component mount
  }, [mode]);

  const handleToggle = (newMode) => {
    setMode(newMode);
    console.log(`Selected mode: ${newMode}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
        <h1>Forum Page</h1>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleToggle('yourPosts');
            }}
            className={`toggle-link ${mode === 'yourPosts' ? 'active' : ''}`}
          >
            <strong>Your Posts</strong>
          </a>
          <span className="separator">|</span>
          <a
            href="#"
            style={{marginLeft: '10px'}}
            onClick={(e) => {
              e.preventDefault();
              handleToggle('viewAll');
            }}
            className={`toggle-link ${mode === 'viewAll' ? 'active' : ''}`}
          >
            <strong>View All Posts</strong>
          </a>
          <span className="separator">|</span>
          <a
            href="#"
            style={{marginLeft: '10px'}}
            onClick={(e) => {
              e.preventDefault();
              handleToggle('draftNew');
            }}
            className={`toggle-link ${mode === 'draftNew' ? 'active' : ''}`}
          >
            <strong>Draft New Post</strong>
          </a>
        </div>
      </div>
      <div>
        {mode === 'yourPosts' ? (
          <div className="postsOutsideContainer">
            <h3>Your Posts</h3>
            <hr className="forumPageHr" />
            {myPosts.map(post => (
              <div key={post.id} className="postWrapper">
                <div className="postBar"></div>
                <div className="postContainer">
                  <div className="postHeader">
                    <span className="postTitle">{post.Title}</span>
                    <span className="postAuthor">{post.Author}</span>
                  </div>
                  <div className="postBody">{post.Content}</div>
                  <div className="postDate">Posted on {post.Date}</div>
                  <div className="postUpvotes">Upvotes: {post.Votes}</div>
                </div>
                <div className="voteButtons">
                  <button id="vote1" className="voteButton">⬆</button>
                  <button id="vote2" className="voteButton">⬇</button>
                </div>
              </div>
            ))}
          </div>
        ) : mode === 'viewAll' ? (
          <div className="postsOutsideContainer">
            <h3>All Posts</h3>
            <hr className="forumPageHr" />
            {posts.map(post => (
              <div key={post.id} className="postWrapper">
                <div className="postBar"></div>
                <div className="postContainer">
                  <div className="postHeader">
                    <span className="postTitle">{post.Title}</span>
                    <span className="postAuthor">{post.Author}</span>
                  </div>
                  <div className="postBody">{post.Content}</div>
                  <div className="postDate">Posted on {post.Date}</div>
                  <div className="postUpvotes">Upvotes: {post.Votes}</div>
                </div>
                <div className="voteButtons">
                  <button id="vote1" className="voteButton">⬆</button>
                  <button id="vote2" className="voteButton">⬇</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="postsOutsideContainer">
            <h3>Draft New Post</h3>
            <hr className="forumPageHr" />

            <form onSubmit={handleSubmit}>
              <input id="titleField" 
                type="text" 
                placeholder="Title" 
                className="inputField" 
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea id="contentField" 
                placeholder="Content" 
                className="inputField" 
                onChange={(e) => setContent(e.target.value)}
              />
              <button id="submitForum" type="submit" className="submitButton">Submit Post</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
