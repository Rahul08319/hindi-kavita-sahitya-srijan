/**
 * Pure Web Audio API Ambient Soundscape Generator
 * Synthesizes realistic meditative soundscapes (Gentle Rain, Tanpura Drone, Night Breeze, Temple Bell)
 * 100% in-browser with zero external asset dependencies!
 */

export type SoundscapeType = "off" | "rain" | "tanpura" | "night" | "bell";

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private currentType: SoundscapeType = "off";
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private volume: number = 0.45;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public getCurrentType(): SoundscapeType {
    return this.currentType;
  }

  public stop() {
    if (!this.ctx) return;
    this.activeNodes.forEach((node) => {
      if (typeof node === "number") {
        window.clearInterval(node);
      } else if ("stop" in node && typeof (node as AudioScheduledSourceNode).stop === "function") {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {}
      }
    });
    this.activeNodes = [];
    this.currentType = "off";
  }

  public play(type: SoundscapeType) {
    this.stop();
    if (type === "off") return;

    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.currentType = type;

    if (type === "rain") {
      this.playRain();
    } else if (type === "tanpura") {
      this.playTanpura();
    } else if (type === "night") {
      this.playNight();
    } else if (type === "bell") {
      this.playTempleBell();
    }
  }

  private playRain() {
    if (!this.ctx || !this.masterGain) return;
    // Pink noise buffer generator for soothing continuous rain
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.masterGain);
    noise.start();
    this.activeNodes.push(noise);

    // Random soft droplets
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || this.currentType !== "rain") return;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      osc.type = "sine";
      const freq = 1200 + Math.random() * 1600;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

      dropGain.gain.setValueAtTime(0.06 * Math.random(), this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(dropGain);
      dropGain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }, 180);

    this.activeNodes.push(interval);
  }

  private playTanpura() {
    if (!this.ctx || !this.masterGain) return;
    // Harmonic Om / Tanpura frequency chord (Sa-Pa-Sa: 136.1Hz - cosmic om frequency)
    const baseFreq = 136.1;
    const harmonics = [baseFreq, baseFreq * 1.5, baseFreq * 2, baseFreq * 3];

    harmonics.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle slow harmonic beating
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      lfo.connect(gain.gain);
      lfo.start();

      gain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      this.activeNodes.push(osc);
      this.activeNodes.push(lfo);
    });
  }

  private playNight() {
    if (!this.ctx || !this.masterGain) return;
    // Night breeze and gentle cricket rhythms
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || this.currentType !== "night") return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(4500 + Math.random() * 500, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    }, 450);

    this.activeNodes.push(interval);
  }

  private playTempleBell() {
    if (!this.ctx || !this.masterGain) return;
    // Resonating Temple Bell / Singing Bowl chime
    const playChime = () => {
      if (!this.ctx || !this.masterGain || this.currentType !== "bell") return;
      const freqs = [432, 864, 1296];
      freqs.forEach((f, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        const amp = 0.12 / (i + 1);
        gain.gain.setValueAtTime(amp, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 3.6);
      });
    };

    playChime();
    const bellInterval = window.setInterval(playChime, 4500);
    this.activeNodes.push(bellInterval);
  }
}

export const ambientSoundEngine = new AmbientAudioEngine();
