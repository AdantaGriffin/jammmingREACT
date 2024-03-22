import React from "react";
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props) {
  function handleNameChange({target}) {
    props.onNameChange(target.value);
  }
  return (
    <div className={styles.Playlist}>
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist isRemoval={false} onRemove={props.onRemove} userSearchResults={props.playlistTracks} />
      <button onClick={props.onSave} className={styles.PlaylistSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}                                                               

export default Playlist;