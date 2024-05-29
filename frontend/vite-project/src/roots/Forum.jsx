import React, { useState, useEffect } from 'react';
import '../styles/Forum.css';
import axios from "axios";

export const Forum = () => {

  const [myPosts, setMyPosts] = useState([])

  async function fetchData() {
    const res = (await axios.get("http://localhost:5001/forum")).data;
    console.log(res);
    setMyPosts(res);
  }

  useEffect(() => {
    fetchData();
  }, [])


  const [mode, setMode] = useState('viewAll');

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
            Your Posts
          </a>
          <span className="separator">|</span>
          <a
            href="#"
            style = {{marginLeft: '10px'}}
            onClick={(e) => {
              e.preventDefault();
              handleToggle('viewAll');
            }}
            className={`toggle-link ${mode === 'viewAll' ? 'active' : ''}`}
          >
            View All Posts
          </a>
          <span className="separator">|</span>
          <a
            href="#"
            style = {{marginLeft: '10px'}}
            onClick={(e) => {
              e.preventDefault();
              handleToggle('draftNew');
            }}
            className={`toggle-link ${mode === 'draftNew' ? 'active' : ''}`}
          >
            Draft New Post
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

            <div className="postWrapper">
              <div className="postBar"></div>
              <div className="postContainer">
                <div className="postHeader">
                  <span className="postTitle">Sample Post Title</span>
                  <span className="postAuthor">John Doe</span>
                </div>
                <div className="postBody">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="postDate">Posted on May 28, 2024</div>
                <div className="postUpvotes">Upvotes: 456</div>
              </div>
              <div className="voteButtons">
                <button id="vote1" className="voteButton">⬆</button>
                <button id="vote2" className="voteButton">⬇</button>
              </div>
            </div>



            <hr className="forumPageHr" />

            <div className="postWrapper">
              <div className="postBar"></div>
              <div className="postContainer">
                <div className="postHeader">
                  <span className="postTitle">Sample Post Title</span>
                  <span className="postAuthor">John Doe</span>
                </div>
                <div className="postBody">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="postDate">Posted on May 28, 2024</div>
                <div className="postUpvotes">Upvotes: 42</div>
              </div>
              <div className="voteButtons">
                <button id="vote1" className="voteButton">⬆</button>
                <button id="vote2" className="voteButton">⬇</button>
              </div>
            </div>



          </div>
        ) : (
          <div className="postsOutsideContainer">
            <h3>Draft New Post</h3>
            <hr className="forumPageHr" />

            <form>
              <input id = "titleField" type="text" placeholder="Title" className="inputField"/>
              <textarea id = "contentField" placeholder="Content" className="inputField"/>
              <button id = "submitForum" type="submit" className="submitButton">Submit Post</button>
            </form>


          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
