export class MusicService {
  constructor(private audio: HTMLAudioElement) {
    audio.load();
  }

  play(startTime: number, musicVolume: number, musicRate: number): void {
    this.audio.volume = musicVolume;
    this.audio.playbackRate = musicRate;

    const duration = this.audio.duration;
    if (duration > startTime) {
      this.audio.currentTime = startTime;
      if (startTime < 0) {
        setTimeout(() => this.audio.play(), -startTime * 1000);
      } else this.audio.play();
    }
  }

  pause(timer?: number) {
    this.audio.pause();
    clearTimeout(timer);
  }
}
