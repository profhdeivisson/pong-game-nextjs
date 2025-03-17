class MusicPlayer {
  constructor() {
    this.playlist = [
      '/music/electric-hearts.mp3',
      '/music/fast-chiptune-for-gaming-videos.mp3',
      '/music/kids-game-gaming-background-music.mp3',
      '/music/lucid-dreams.mp3',
      '/music/play-time-fun-upbeat-gaming-birthday-music.mp3',
      '/music/retro-gaming.mp3',
      '/music/victory-awaits-in-the-gaming-universe_astronaut.mp3'
    ];

    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.volume = 0.1;
      this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
    }
  }

  play() {
    if (this.audio) {
      this.audio.src = this.playlist[this.currentTrackIndex];
      this.audio.play();
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.play();
  }

  previousTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.play();
  }

  setVolume(value) {
    if (this.audio) {
      this.audio.volume = value;
    }
  }

  getCurrentTrackName() {
    const fullPath = this.playlist[this.currentTrackIndex];
    return fullPath.split('/').pop().replace('.mp3', '').replace(/-/g, ' ');
  }
}

export const musicPlayer = new MusicPlayer();