import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import mockphoto from '../images/mockprofilephoto.png';
import '../styles/Discover.css';
import axios from "axios";

export const Discover = () => {
  const [profiles, setProfiles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  async function fetchPublicProfiles() {
    try {
      const res = await axios.get("http://localhost:5001/users");
      setProfiles(res.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  }

  useEffect(() => {
    fetchPublicProfiles();
  }, []);

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
      <div className="Discography">
        {profiles.map((profile) => (
          <div key={profile.id} className="IndividualProfile">
            <Link to={`/profile/${profile.id}`} className="profile-link">
              <img className="profile-image" src={profile.image || mockphoto} alt='Profile' />
              <div className="profile-name">{profile.display_name}'s Profile</div>
            </Link>
            <Link to={`/chat/${profile.id}`} className="profile-chat-icon">
              <div className="chat-bubble"></div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
