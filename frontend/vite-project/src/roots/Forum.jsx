import { useState, useEffect } from 'react'
import React from 'react'
import axios from "axios";

export const Forum = () => {
  const [posts, setPosts] = useState([])

  async function fetchData() {
    const res = (await axios.get("http://localhost:5001/forum")).data;
    console.log(res);
    setPosts(res);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <h1>Forum Page</h1>
      {
        posts.map((post) => {
          return <h3>{post["title"]}</h3>
        })
      }
       {/* <label>Post title</label>
          <input type="text"></input>
          <br></br>
          <br></br>
          <label>Post content</label>
          <input type="text"></input>
          <br></br>
          <br></br> */}
    </div>
  )
}

export default Forum;
