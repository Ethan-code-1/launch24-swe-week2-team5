import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Input, IconButton, Drawer } from 'rsuite';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import ShieldIcon from '@rsuite/icons/Shield';
import SearchIcon from '@rsuite/icons/Search';
import { AuthContext } from '../components/AuthContext';
import '../styles/LikedSongs.css';

const { Column, HeaderCell, Cell } = Table;

export const LikedSongs = () => {
  const { userData } = useContext(AuthContext);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedSongs, setLikedSongs] = useState([]); // Initialize as an empty array
  const [artistInfo, setArtistInfo] = useState(null);
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
      }
    };

    if (accessToken) {
      fetchLikedSongs();
    }
  }, [accessToken]);

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

  const handleSearchChange = (value) => {
    setSearchQuery(value);
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
          <div className="banner-image">
            <ShieldIcon style={{ fontSize: 100, color: 'white' }} />
          </div>
          <div className="banner-text">
            <h1>Liked Songs</h1>
            <p>{likedSongs.length} songs</p>
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
        <Table data={filteredSongs} height={600} className="songs-table">
          <Column width={50} align="center" fixed>
            <HeaderCell>#</HeaderCell>
            <Cell>{rowData => likedSongs.indexOf(rowData) + 1}</Cell>
          </Column>
          <Column width={60} align="center" fixed>
            <HeaderCell>Cover</HeaderCell>
            <Cell>{rowData => <img src={rowData.track.album.images[0].url} alt={rowData.track.name} className="table-cover-img" />}</Cell>
          </Column>
          <Column flexGrow={1} fixed>
            <HeaderCell>Title</HeaderCell>
            <Cell>{rowData => rowData.track.name}</Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Album</HeaderCell>
            <Cell>{rowData => rowData.track.album.name}</Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Artist</HeaderCell>
            <Cell>
              {rowData => (
                <span className="artist-name" onClick={() => handleSongClick(rowData)}>
                  {rowData.track.artists.map(artist => artist.name).join(', ')}
                </span>
              )}
            </Cell>
          </Column>
          <Column width={100} align="center">
            <HeaderCell>Action</HeaderCell>
            <Cell>{rowData => <IconButton icon={<ShieldIcon />} color="blue" appearance="subtle" />}</Cell>
          </Column>
        </Table>
      </div>
      <Drawer placement="right" size="sm" open={isPanelOpen} onClose={closePanel}>
        {selectedSong && (
          <div className="artist-panel">
            <IconButton icon={<CloseOutlineIcon />} className="close-btn" onClick={closePanel} />
            <div className="artist-panel-content">
              <div className="panel-card">
                <img src={selectedSong.album.images[0].url} alt={selectedSong.name} className="panel-cover-img"/>
                <h2>{selectedSong.album.name}</h2>
                <h3>{selectedSong.name}</h3>
              </div>
              {artistInfo && (
                <div className="panel-card">
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
