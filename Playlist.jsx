// Playlist.js
import React from 'react'


const Playlist = ({ videos, onSelectVideo, onDragStart, onDragOver, onDrop }) => {
  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {videos.map((video, index) => (
          <li
            key={index}
            draggable
            onDragStart={e => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={e => onDrop(e, index)}
            onClick={() => onSelectVideo(video)}
          >
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
