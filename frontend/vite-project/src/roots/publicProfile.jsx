import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";
import "../styles/Profile.css";
import "../styles/Topartists.css";
import "../styles/Navbar.css";
import { useParams } from 'react-router-dom'

export const PublicProfile = () => {
  const { userData } = useContext(AuthContext);
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [userInfo, setUserInfo] = useState(null)
//   const [user, setUser] = useState(null);
  const accessToken = localStorage.getItem("access_token");
  const items = 5;
  const {id} = useParams()

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/public-profile/${id}`)
      console.log(res.data);
      setUserInfo(res.data);
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);
  return (
    <>
      <div className="content-container"></div>

      {userInfo && (
        <>
        <div className="profile">
          <img
            src={
              userInfo["spotify-data"].images[0]
                ? userInfo["spotify-data"].images[0].url
                : "../../public/spotify-default.jpg"
            }
            alt="user-image"
            className="artist"
          />
          <div>
            <p style={{ color: "white", fontSize: "1.5em" }}>Profile</p>
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              href={userInfo["spotify-data"].external_urls.spotify}
            >
              <h1>{userInfo["spotify-data"].display_name}</h1>
            </a>
          </div>
        </div>
      <hr className="solid"></hr>
      <div className="content-container">
        <h1 style={{ color: "white" }}>Top Songs</h1>
      </div>

      
        {userInfo["top-tracks"].length > 0 ? (userInfo["top-tracks"].slice(0, items).map((song) => {
            console.log(song);
            return (
              <div id="top-artist-grid">
              <div className="card-button-wrapper">
                <a
                  key={song.id}
                  href={song.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="artist-button">
                    <div className="top-artist">
                      <img
                        src={song.images[0].url}
                        className="song"
                        alt={song.name}
                      />
                      <p>{song.name}</p>
                    </div>
                  </button>
                </a>
              </div>
              </div>
            );
          })) : (
            <h3>No top songs avaliable</h3>
          )}


      <div className="content-container">
        <h1 style={{ color: "white" }}>Top Artists</h1>
      </div>

      {userInfo["top-artists"].length > 0 ? (

      <div id="top-artist-grid">
        {userInfo["top-artists"].slice(0, items).map((artist) => {
            const artistImage =
              artist.images && artist.images[0]
                ? artist.images[0].url
                : "../../public/spotify-default.jpg";
            return (
              <div className="card-button-wrapper">
                <a
                  key={artist.id}
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="artist-button">
                    <div className="top-artist">
                      <img
                        src={artistImage}
                        className="artist"
                        alt={artist.name}
                      />
                      <p>{artist.name}</p>
                    </div>
                  </button>
                </a>
              </div>
            );
          })}
      </div>
      ) :(<h3>No top artists avaliable</h3>)}
      </>
      )}
    </>
  );
};

export default PublicProfile;
