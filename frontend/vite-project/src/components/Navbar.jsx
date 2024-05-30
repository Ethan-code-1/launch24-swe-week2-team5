import React, { useState, useContext, useEffect } from 'react';
import { Sidenav, Nav, IconButton } from 'rsuite';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import { AuthContext } from "../components/AuthContext";
import Auth from '../components/Auth'
import Discover from '../roots/Discover.jsx';
import Home from '../roots/Home.jsx';
import Forum from '../roots/Forum.jsx';
import Profile from '../roots/Profile.jsx';
import TopArtists from '../roots/TopArtists';
import TopSongs from '../roots/TopSongs';
import LikedSongs from '../roots/LikedSongs';
import Inbox from '../roots/Inbox';
import axios from 'axios'


import '../styles/Navbar.css';

const panelStyles = {
  padding: '15px 20px',
  color: '#aaa'
};

const headerStyles = {
  padding: 20,
  fontSize: 'calc(16px + 1vw)',
  background: 'linear-gradient(90deg, #8A2BE2, #FF00FF)',
  color: '#FFFFFF',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  fontFamily: '"Poppins", sans-serif',
  borderBottom: '3px solid #6A1B9A'
};

const sidenavContainerStyles = {
  display: 'flex',
  height: '100vh',
  paddingTop: 83
};

const sidenavStyles = {
  width: 240,
  height: '100%',
  position: 'fixed',
  top: 83,
  zIndex: 1,
  backgroundColor: '#212121',
  color: '#FFFFFF',
  paddingTop: 20,
  borderRight: '2px solid rgba(255, 255, 255, 0.4)'
};

const contentStyles = {
  marginLeft: 240,
  padding: '20px',
  width: '100%',
  transition: 'margin-left 0.0s ease'
};

const navItemStyles = {
  backgroundColor: '#212121',
  color: '#FFFFFF'
};

const MyNavbar = () => {
  
  /* Check if user is logged in */
  const { userData, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  useEffect(() => {
    if (userData === null) {
      const urlParams = new URLSearchParams(window.location.search);
      const access_token = urlParams.get("access_token");
      const refresh_token = urlParams.get("refresh_token");
      const id = urlParams.get("id");
      const error = urlParams.get("error");


      if (error) {
        alert("There was an error during the authentication");
      } else if (access_token) {
        login({ access_token, refresh_token, id });
        console.log({ access_token, refresh_token, id });
      }
    }
  }, []);
  
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const location = useLocation();

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  const dynamicContentStyles = {
    ...contentStyles,
    marginLeft: isSidenavOpen ? 240 : 0
  };

  const renderContent = () => {
    switch (location.pathname) {
      case '/*':
        return <Home />;
      case '/forum':
        return <Forum />;
      case '/discover':
        return <Discover />;
      case '/profile':
        return <Profile />;
      case '/top-artists':
        return <TopArtists />;
      case '/top-songs':
        return <TopSongs />;
      case '/liked-songs':
        return <LikedSongs></LikedSongs>
      case '/inbox':
        return <Inbox></Inbox>
      default:
        return <Home />;
    }
  };

  return (
    <>
      <div style={headerStyles}>
        <IconButton
          icon={<AngleRightIcon style={{ fontWeight: 'bold', color: '#FFFFFF' }} />}
          onClick={toggleSidenav}
          style={{
            zIndex: 3,
            marginRight: '20px',
            border: '2px solid #FFFFFF',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: '#FFFFFF'
          }}
        />
        <div className="fade-in" style={{ paddingLeft: '2vw', fontSize: '2rem' }}>
          <strong>SpotiMy</strong>
          <img src="/spotifyIcon.png" alt="spotifyIcon" style={{ maxWidth: '50px', height: 'auto', marginLeft: '10px' }} />
        </div>
      </div>
      <div style={sidenavContainerStyles}>
        {isSidenavOpen && (
          <Sidenav defaultOpenKeys={['3', '4']} style={sidenavStyles}>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" icon={<DashboardIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/">
                  <strong>Home</strong>
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/profile">
                  <strong>Profile</strong>
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<MagicIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/top-artists">
                  <strong>Top Artists</strong>
                </Nav.Item>
                <Nav.Item eventKey="4" icon={<GearCircleIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/top-songs">
                  <strong>Top Songs</strong>
                </Nav.Item>
                <Nav.Item eventKey="5" icon={<GearCircleIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/forum">
                  <strong>Forums</strong>
                </Nav.Item>
                <Nav.Item eventKey="6" icon={<GearCircleIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/discover">
                  <strong>Discover</strong>
                </Nav.Item>
                <Nav.Item eventKey="7" icon={<GearCircleIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/liked-songs">
                  <strong>Liked Songs</strong>
                </Nav.Item>
                <Nav.Item eventKey="8" icon={<GearCircleIcon style={{ color: '#FFFFFF' }} />} style={navItemStyles} as={Link} to="/inbox">
                  <strong>Inbox</strong>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        )}
        <div className="centerContentContainer" style={dynamicContentStyles}>
          <div style={{ paddingLeft: '10px', paddingTop: '10px', paddingRight: '10px', paddingBottom: '10px' }}>
            {userData === null ? (
              <>
              <h1>Please Login</h1>
              <button onClick={() => navigate('/login')}>Go to Login</button>
              </>
            ) : renderContent()}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .rs-sidenav {
            position: fixed;
            width: 100%;
            height: auto;
            top: 83px;
            left: 0;
            z-index: 1;
            background: purple;
            color: white;
          }
          .rs-sidenav-body {
            height: calc(100vh - 83px);
          }
          .dynamicContentStyles {
            margin-left: 0;
            transition: margin-left 0.3s ease;
          }
        }
      `}</style>
    </>
  );
};

export default MyNavbar;
