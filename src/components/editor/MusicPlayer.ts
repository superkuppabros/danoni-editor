export class MusicPlayer {
  constructor(private audio: HTMLAudioElement) {
    audio.load();
  }

  play(startTime: number): void {
    const duration = this.audio.duration;
    console.log(duration);
    if (duration > startTime) {
      this.audio.currentTime = startTime;
      this.audio.play();
    }
  }

  pause(timer?: number) {
    this.audio.pause();
    clearTimeout(timer);
  }
}
