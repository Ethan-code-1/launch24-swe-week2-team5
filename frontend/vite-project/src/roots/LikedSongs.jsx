import React, { useState } from 'react';
import { Table, Input, IconButton, Drawer, Avatar } from 'rsuite';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import SearchIcon from '@rsuite/icons/Search';
import ShieldIcon from '@rsuite/icons/Shield';
import '../styles/LikedSongs.css';

const { Column, HeaderCell, Cell } = Table;

export const LikedSongs = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedSongs, setLikedSongs] = useState([
    { id: 1, title: 'The Thrill', album: 'The Thrill', artist: 'Wiz Khalifa', cover: 'cover1.jpg', artistImage: 'artist1.jpg' },
    { id: 2, title: 'Feel It', album: 'Feel It', artist: 'd4vd', cover: 'cover2.jpg', artistImage: 'artist2.jpg' },
    { id: 3, title: 'on one tonight', album: 'One of Wun', artist: 'Gunna', cover: 'cover3.jpg', artistImage: 'artist3.jpg' },
    // Add more songs as needed
  ]);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredSongs = likedSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Cell>{rowData => <Avatar size="lg" src={rowData.cover} alt={rowData.title} />}</Cell>
          </Column>
          <Column flexGrow={1} fixed>
            <HeaderCell>Title</HeaderCell>
            <Cell dataKey="title" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Album</HeaderCell>
            <Cell dataKey="album" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Artist</HeaderCell>
            <Cell>{rowData => <span className="artist-name" onClick={() => handleSongClick(rowData)}>{rowData.artist}</span>}</Cell>
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
              <Avatar size="lg" src={selectedSong.cover} alt={selectedSong.title} className="panel-cover-img"/>
              <h2>{selectedSong.title}</h2>
              <h3>{selectedSong.artist}</h3>
              <div className="album-name">{selectedSong.album}</div>
              <Avatar size="lg" src={selectedSong.artistImage} alt={selectedSong.artist} className="artist-img" />
              <div className="artist-about">About the Artist</div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default LikedSongs;
