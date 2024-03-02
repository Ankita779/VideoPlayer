// VideoPlayer.js
import React, { useState, useRef, useEffect } from 'react';


const VideoPlayer = ({ src, autoplay, onTimeUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate(video.currentTime);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    video.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  const handleSeek = event => {
    const video = videoRef.current;
    const seekTime = (event.nativeEvent.offsetX / event.target.clientWidth) * duration;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <video ref={videoRef} src={src} autoPlay={autoplay}></video>
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <div onClick={handleSeek}>
          <input type="range" min={0} max={duration || 0} value={currentTime} />
        </div>
        <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        <select value={playbackSpeed} onChange={e => setPlaybackSpeed(parseFloat(e.target.value))}>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
