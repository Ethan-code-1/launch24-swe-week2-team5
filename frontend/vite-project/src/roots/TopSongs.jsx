import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from 'axios';

export const TopSongs = () => {
  const { userData } = useContext(AuthContext);
  const [topTracks, setTopTracks] = useState([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/spotify/top-tracks', {
          params: { access_token: accessToken }
        })
        setTopTracks(response.data.items);
        console.log(response.data.items);
      } catch (e) {
        console.error('Error fetching top tracks', e);
      }
    }
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    // <div className="top-tracks">
    //   <h1>Your Top Tracks</h1>
    //   {topTracks.length === 0 ? (
    //     <p>No top tracks available.</p>
    //   ) : (
    //     <ul>
    //       {topTracks.map(track => (
    //         <li key={track.id}>
    //           <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <h1>hi</h1>
  );
};

export default TopSongs;
