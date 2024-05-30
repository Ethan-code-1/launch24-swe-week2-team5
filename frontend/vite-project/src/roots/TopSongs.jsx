import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Input, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { AuthContext } from '../components/AuthContext';
import '../styles/TopSongs.css';

const timeOptions = [
  { label: 'Weekly', value: 'short_term' },
  { label: 'Monthly', value: 'medium_term' },
  { label: 'Yearly', value: 'long_term' }
];

export const TopSongs = () => {
  const { userData } = useContext(AuthContext);
  const [topTracks, setTopTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('medium_term'); // Default to monthly
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/spotify/top-tracks', {
          params: { access_token: accessToken, time_range: timeRange }
        });
        setTopTracks(response.data.items);
      } catch (e) {
        console.error('Error fetching top tracks', e);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, timeRange]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  const filteredTracks = topTracks?.filter(track =>
    track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artists.some(artist => artist.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRowClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="top-songs-container">
      <div className="banner">
        <div className="banner-content">
          <div className="banner-text">
            <h1>Top Songs</h1>
            <p>{filteredTracks.length} songs</p>
          </div>
        </div>
      </div>
      <div className="songs-list">
        <div className="header">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            prefix={<SearchIcon />}
            className="search-input"
          />
          <SelectPicker
            data={timeOptions}
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="time-range-picker"
            cleanable={false}
          />
        </div>
        <div className="table-header">
          <div className="column-number">#</div>
          <div className="column-cover">Cover</div>
          <div className="column-title">Title</div>
          <div className="column-album">Album</div>
          <div className="column-artist">Artist</div>
        </div>
        {filteredTracks?.map((track, index) => (
          <div
            key={track.id}
            className="song-row"
            onClick={() => handleRowClick(track.external_urls.spotify)}
          >
            <div className="column-number">{index + 1}</div>
            <div className="column-cover">
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="song-cover"
              />
            </div>
            <div className="column-title">{track.name}</div>
            <div className="column-album">{track.album.name}</div>
            <div className="column-artist">
              {track.artists.map(artist => artist.name).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSongs;
