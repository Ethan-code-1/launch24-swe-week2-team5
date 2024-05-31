import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";
import "../styles/Profile.css";
import "../styles/Topartists.css";
import "../styles/Discover.css";

export const Profile = () => {
  const { userData } = useContext(AuthContext);
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("access_token");
  const items = 5;
  const [isPublicProfile, setIsPublicProfile] = useState(true);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        response = await axios.get(
          "http://localhost:5001/spotify/top-artists",
          {
            params: { access_token: accessToken, time_range: "medium_term" },
          }
        );
        setTopArtists(response.data.items.slice(0, items));

        response = await axios.get("http://localhost:5001/spotify/top-tracks", {
          params: { access_token: accessToken, time_range: "medium_term" },
        });
        setTopSongs(response.data.items.slice(0, items));

        response = await axios.get(
          "http://localhost:5001/spotify/liked-tracks",
          {
            params: { access_token: accessToken },
          }
        );
        setLikedSongs(response.data.items.slice(0, items));

        response = await axios.get("http://localhost:5001/spotify/user-info", {
          params: { access_token: accessToken },
        });
        setUser(response.data);

        const res = await axios.get("http://localhost:5001/users")  
        
        
        setUsersData(res.data);
        
        const userId = usersData.find(user => user.id === userId);
        setIsPublicProfile(userId.isPublic);
        console.log(isPublicProfile);

         // setIsPrivateProfile(response.data)
        // console.log()

        setLoading(false);
      } catch (e) {
        console.error("Error fetching data", e);
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);
  
  const handlePublicPrivateProfile = () => {
    setIsPublicProfile(!isPrivateProfile);

  }
  return (
    <>
      {loading ? (
        <div className="loader" />
      ) : (
        <>
          <div className="content-container"></div>

          {user && (
            <div className="profile">
              <img
                src={
                  user.images && user.images[1]
                    ? user.images[1].url
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
                  href={user.external_urls.spotify}
                >
                  <h1>{user.display_name}</h1>
                </a>
              </div>
            </div>
          )}
        <div class="profile-switch">
          <h3 className="isPublicText">Private Profile?</h3>
          <label class="switch">
            <input className="slidercontainer" type="checkbox" onChange={handlePublicPrivateProfile}/>
            <span class="slider round"></span>
          </label>
        </div>
          <hr className="solid" />
          <div className="content-container">
            <h1 style={{ color: "white" }}>Top Songs</h1>
          </div>

          <div id="top-artist-grid">
            {topSongs.length > 0 ? (
              topSongs.map((song) => (
                <div className="card-button-wrapper" key={song.id}>
                  <a
                    href={song.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="artist-button">
                      <div className="top-artist">
                        <img
                          src={song.album.images[0].url}
                          className="song"
                          alt={song.name}
                        />
                        <p>{song.name}</p>
                      </div>
                    </button>
                  </a>
                </div>
              ))
            ) : (
              <h3>No top songs avaliable</h3>
            )}
          </div>

          <div className="content-container">
            <h1 style={{ color: "white" }}>Top Artists</h1>
          </div>

          <div id="top-artist-grid">
            {topArtists.length > 0 ? (
              topArtists.map((artist) => {
                const artistImage =
                  artist.images && artist.images[0]
                    ? artist.images[0].url
                    : "../../public/spotify-default.jpg";
                return (
                  <div className="card-button-wrapper" key={artist.id}>
                    <a
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
              })
            ) : (
              <h3>No top artists avaliable</h3>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
