import React from 'react'
import {Link} from "react-router-dom"
import {useState} from 'react'


import '../styles/Discover.css'
import mockphoto from '../images/mockprofilephoto.png'
export const Discover = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    
    <div>
      {/* HEADER SECTION WITH DISCOVER AND FOLLOWING TABS */}
      <header>
        <div className={`links-container ${menuOpen ? 'show' : ''}`}>
          <Link className="discover-link" to="/discover">Discover</Link>
          <Link className="following-link" to="/discover/following">Following</Link>
        </div>
      </header>  

      
      <h1>Discover Page</h1>
      <div className= "Discography">

        <div className='IndividualProfile'>
          <img className="profile-image" src={mockphoto} alt='mockPhoto'/>
          <div className="profile-name">Sara's Profile</div>
          <div className="profile-chat-icon">💬</div>
        </div>
        <div className='IndividualProfile'>
          <img className="profile-image" src={mockphoto} alt='mockPhoto'/>
          <div className="profile-name">Sara's Profile</div>
          <div className="profile-chat-icon">💬</div>
        </div>        <div className='IndividualProfile'>
          <img className="profile-image" src={mockphoto} alt='mockPhoto'/>
          <div className="profile-name">Sara's Profile</div>
          <div className="profile-chat-icon">💬</div>
        </div>
      </div>
      
    </div>
  )
}

export default Discover;
