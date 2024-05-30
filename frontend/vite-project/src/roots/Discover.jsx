import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import mockphoto from '../images/mockprofilephoto.png';
import '../styles/Discover.css';
import axios from "axios";

export const Discover = () => {
  const [profiles, setProfiles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProfiles = profiles.filter(profile =>
    profile.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* HEADER SECTION WITH DISCOVER AND FOLLOWING TABS */}
      <header>
        <div className={`links-container ${menuOpen ? 'show' : ''}`}>
          <Link className="discover-link" to="/discover">Discover</Link>
          <Link className="following-link" to="/discover/following">Following</Link>
        </div>
        <div className="search-box">
          <button className="btn-search"><i className="fas fa-search"></i></button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="Discography">
        {filteredProfiles.map((profile) => (
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
