import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Input, Drawer, IconButton } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import { AuthContext } from '../components/AuthContext';
import '../styles/LikedSongs.css';

export const LikedSongs = () => {
  const { userData } = useContext(AuthContext);
  const [likedSongs, setLikedSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [artistInfo, setArtistInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/spotify/liked-tracks', {
          params: { access_token: accessToken }
        });
        setLikedSongs(response.data.items);
      } catch (error) {
        console.error('Error fetching liked songs', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchLikedSongs();
    }
  }, [accessToken]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSongClick = async (song) => {
    setSelectedSong(song.track);
    setIsPanelOpen(true);
    try {
      const artistResponse = await axios.get('http://localhost:5001/spotify/artist', {
        params: {
          access_token: accessToken,
          artistId: song.track.artists[0].id,
        },
      });
      setArtistInfo(artistResponse.data);
    } catch (error) {
      console.error('Error fetching artist info', error);
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const filteredSongs = likedSongs?.filter(song =>
    song.track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.track.album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.track.artists.some(artist => artist.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="liked-songs-container">
      <div className="banner">
        <div className="banner-content">
          <div className="banner-text">
            <h1>Liked Songs</h1>
            <p>{filteredSongs.length} songs</p>
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
        </div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="table-header">
              <div className="column-number">#</div>
              <div className="column-cover">Cover</div>
              <div className="column-title">Title</div>
              <div className="column-album">Album</div>
              <div className="column-artist">Artist</div>
            </div>
            {filteredSongs?.map((song, index) => (
              <div
                key={song.track.id}
                className="song-row"
                onClick={() => handleSongClick(song)}
              >
                <div className="column-number">{index + 1}</div>
                <div className="column-cover">
                  <img
                    src={song.track.album.images[0].url}
                    alt={song.track.name}
                    className="song-cover"
                  />
                </div>
                <div className="column-title">{song.track.name}</div>
                <div className="column-album">{song.track.album.name}</div>
                <div className="column-artist">
                  {song.track.artists.map(artist => artist.name).join(', ')}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Drawer placement="right" size="sm" open={isPanelOpen} onClose={closePanel}>
        {selectedSong && (
          <div className="artist-panel">
            <IconButton icon={<CloseOutlineIcon />} className="close-btn" onClick={closePanel} />
            <div className="artist-panel-content">
              <div className="panel-card" onClick={() => window.open(selectedSong.external_urls.spotify, "_blank")}>
                <img src={selectedSong.album.images[0].url} alt={selectedSong.name} className="panel-cover-img" />
                <h2>{selectedSong.name}</h2>
                <div className="album-name">{selectedSong.album.name}</div>
              </div>
              {artistInfo && (
                <div className="panel-card" onClick={() => window.open(artistInfo.external_urls.spotify, "_blank")}>
                  <img src={artistInfo.images[0].url} alt={artistInfo.name} className="artist-img" />
                  <h3>{artistInfo.name}</h3>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default LikedSongs;
