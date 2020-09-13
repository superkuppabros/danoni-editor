export class MusicService {
  private context: AudioContext = new AudioContext();
  private gainNode: GainNode;

  constructor(private audio: HTMLAudioElement) {
    audio.load();
    const track = this.context.createMediaElementSource(audio);
    const gainNode = this.context.createGain();
    track.connect(gainNode);
    gainNode.connect(this.context.destination);
    this.gainNode = gainNode;
  }

  play(startTime: number, musicVolume: number, musicRate: number): void {
    this.gainNode.gain.value = musicVolume;
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
