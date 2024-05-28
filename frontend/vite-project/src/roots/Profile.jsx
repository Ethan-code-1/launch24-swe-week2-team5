import React from 'react'
import '../styles/profile.css';
import '../App.css'
import pic from "../assets/profile-pic.webp"
import { BsPencil } from "react-icons/bs";
import List from '../components/list';

export const Profile = () => {
  return (
    <div className='content-container'>
      <div className='header-container'>
        <img src={pic} alt="Avatar"/>
        <div className='info-container'>
          <div className="username-container">
            <h1>Username</h1>
            <BsPencil className='edit' size={25} />
          </div>
          <text className='sub-text'>187,237 minutes listened • 57 unique genres • 85 different artists</text>
        </div>
        
      </div>
      <List title="Top Artists"/>
    </div>
  )
}

