import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";
import "../styles/Profile.css";
import "../styles/Topartists.css";

export const Profile = () => {
  const { userData } = useContext(AuthContext);
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [user, setUser] = useState(null);
  const accessToken = localStorage.getItem("access_token");
  const items = 5;

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
        console.log("asdfasdf", response.data.items.slice(0, items));
        response = await axios.get("http://localhost:5001/spotify/top-tracks", {
          params: { access_token: accessToken, time_range: "medium_term" },
        });
        setTopSongs(response.data.items.slice(0, items));
        console.log("asdfasdf", response.data.items.slice(0, items));
        response = await axios.get(
          "http://localhost:5001/spotify/liked-tracks",
          {
            params: { access_token: accessToken },
          }
        );
        setLikedSongs(response.data.items.slice(0, items));
        console.log("asdfasdf", response.data.items.slice(0, items));

        response = await axios.get("http://localhost:5001/spotify/user-info", {
          params: { access_token: accessToken },
        });
        setUser(response.data);
        console.log("asdfasdf", response.data);
      } catch (e) {
        console.error("Error fetching top artists", e);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);
  return (
    <>
      <div className="content-container"></div>

      {user && (
        <div className="profile">
          <img
            src={
              user.images[0] && user.images
                ? artist.images[0].url
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
      <hr class="solid"></hr>
      <div className="content-container">
        <h1 style={{ color: "white" }}>Top Songs</h1>
      </div>

      <div id="top-artist-grid">
        {topSongs &&
          topSongs.map((song) => {
            return (
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
                        src={song.album.images[0].url}
                        className="song"
                        alt={song.name}
                      />
                      <p>{song.name}</p>
                    </div>
                  </button>
                </a>
              </div>
            );
          })}
      </div>

      <div className="content-container">
        <h1 style={{ color: "white" }}>Top Artists</h1>
      </div>

      <div id="top-artist-grid">
        {topArtists &&
          topArtists.map((artist) => {
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
    </>
  );
};

export default Profile;
