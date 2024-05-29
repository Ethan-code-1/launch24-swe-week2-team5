import { useState, useEffect, useContext } from 'react'
import React from 'react'
import axios from "axios";

export const Forum = () => {
  const [posts, setPosts] = useState([])
  const [id, setId] = useState('');

  async function fetchData() {
    const res = (await axios.get("http://localhost:5001/forum")).data;
    console.log(res);
    setPosts(res);
  }

  useEffect(() => {
    fetchData();
    setId(localStorage.getItem("id"));
  }, [])

  return (
    <div>
      <h1>Forum Page</h1>
      {
        posts.map((post) => {
          return <h3>{post["Title"]}</h3>
        })
      }
    </div>
  )
}

export default Forum;
