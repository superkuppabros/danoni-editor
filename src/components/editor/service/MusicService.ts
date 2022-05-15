export class MusicService {
  public canPlay: boolean;
  private context: AudioContext = new AudioContext();
  private gainNode: GainNode;
  private buffer!: AudioBuffer;
  private source: AudioBufferSourceNode;
  private isPlaying: boolean;

  constructor(arrayBuffer: ArrayBuffer) {
    const gainNode = this.context.createGain();
    gainNode.connect(this.context.destination);
    this.gainNode = gainNode;
    this.canPlay = false;
    this.context.decodeAudioData(
      arrayBuffer,
      (buffer) => {
        this.buffer = buffer;
        this.canPlay = true;
      },
      () => {
        throw "failed loading music.";
      }
    );
    this.source = this.context.createBufferSource();
    this.isPlaying = false;
  }

  /**
   *
   * @param startTime 開始秒
   * @param duration 再生する長さ(秒)
   * @param musicVolume 音量(0-1)
   * @param musicRate 速度(0.25-2)
   */
  play(startTime: number, duration: number, musicVolume: number, musicRate: number): void {
    if (!this.buffer) {
      return;
    }

    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.gain.value = musicVolume;
    this.source.playbackRate.value = musicRate;

    const musicDuration = this.buffer.duration;
    if (musicDuration > startTime) {
      if (startTime < 0) {
        // 再生開始のみ倍速の補正が必要
        this.source.start(this.context.currentTime - startTime / musicRate, 0, duration + startTime);
      } else this.source.start(0, startTime, duration);
      this.isPlaying = true;
    }
  }

  pause(timer?: number) {
    if (this.isPlaying) {
      this.source.stop(0);
    }
    clearTimeout(timer);
    this.isPlaying = false;
  }

  changeVolume(volume: number) {
    this.gainNode.gain.value = volume;
  }

  changeRate(rate: number) {
    this.source.playbackRate.value = rate;
  }
}
