'use client'
import React, { useState, useEffect } from 'react';
import styles from './MusicControls.module.css';
import { musicPlayer } from '@/utils/musicPlayer';

export default function MusicControls() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [volume, setVolume] = useState(10);

  useEffect(() => {
    setMounted(true);
    setCurrentTrack(musicPlayer.getCurrentTrackName());
    musicPlayer.setVolume(volume / 100);
  }, []);

  if (!mounted) {
    return null;
  }

  const togglePlay = () => {
    if (isPlaying) {
      musicPlayer.pause();
    } else {
      musicPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    musicPlayer.nextTrack();
    setCurrentTrack(musicPlayer.getCurrentTrackName());
  };

  const handlePrevious = () => {
    musicPlayer.previousTrack();
    setCurrentTrack(musicPlayer.getCurrentTrackName());
  };

  const handleVolume = (e) => {
    const value = e.target.value;
    setVolume(value);
    musicPlayer.setVolume(value / 100);
  };

  return (
    <div className={styles.musicControls}>
      <div className={styles.trackInfo}>
        <div className={`${styles.cd} ${isPlaying ? styles.spinning : ''}`}>💿</div>
        <span className={styles.trackName}>{currentTrack}</span>
      </div>
      <div className={styles.controls}>
        <button onClick={handlePrevious}>⏮</button>
        <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
        <button onClick={handleNext}>⏭</button>
      </div>
      <div className={styles.volume}>
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
}