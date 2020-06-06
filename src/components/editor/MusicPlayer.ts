export class MusicPlayer {
  constructor(private audio: HTMLAudioElement) {
    audio.load();
  }

  play(startTime: number): void {
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
