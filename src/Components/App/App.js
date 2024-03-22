import React, { useState } from "react";
import styles from './App.module.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import { Spotify } from '../Spotify/Spotify';

function App () {
  const [searchResults, setSearchResults] = useState([
    {
    name: 'name 1',
    artist: 'artist 1',
    album: 'album 1',
    id: 1,
  },
  {
    name: 'name 2',
    artist: 'artist 2',
    album: 'album 2',
    id: 2,
  },
  {
    name: 'name 3',
    artist: 'artist 3',
    album: 'album 3',
    id: 3,
  },

 ]);
  const [playlistName, setPlaylistName] = useState('examplePlaylistName');
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'example Playlist | name 1',
      artist: 'example Playlist | artist 1',
      album: 'example Playlist | album 1',
      id: 1,
  },
  {
    name: 'example Playlist | name 2',
    artist: 'example Playlist | artist 2',
    album: 'example Playlist | album 2',
    id: 2,
  },
  {
    name: 'example Playlist | name 3',
    artist: 'example Playlist | artist 3',
    album: 'example Playlist | album 3',
    id: 3,
  },
]);
  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack){
      console.log('Track already exist');
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }
  function updatePlaylistName(name) {
    setPlaylistName(name);
  }
  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }
  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
  }
    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing</h1> 
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search} />
          <div className={styles.AppPlaylist}>
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults onAdd={addTrack} userSearchResults={searchResults} />
            {/* <!-- Add a Playlist component --> */}
            <Playlist onSave={savePlaylist} onNameChange={updatePlaylistName} onRemove={removeTrack} playlistName={playlistName} playlistTracks={playlistTracks} />
          </div>
        </div>
      </div>
        ); 
}

export default App;