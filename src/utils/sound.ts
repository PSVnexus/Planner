// Serene Web Audio synthesized luxury acoustic feedback

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // Pure crystal singing bowl chime for task completion
  public playGentleChime() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const fundamental = 528; // Serene 528 Hz transformation frequency

      // Fundamental harmonic
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(fundamental, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 2.3);

      // Warm octave harmonic
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(fundamental * 1.5, now); // Perfect fifth (792 Hz)

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now);
      osc2.stop(now + 1.9);

      // Shimmer overtone
      const osc3 = this.audioCtx.createOscillator();
      const gain3 = this.audioCtx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(fundamental * 2, now); // Octave

      gain3.gain.setValueAtTime(0, now);
      gain3.gain.linearRampToValueAtTime(0.05, now + 0.03);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc3.connect(gain3);
      gain3.connect(this.audioCtx.destination);
      osc3.start(now);
      osc3.stop(now + 1.3);
    } catch {
      // Audio context might be restricted or unsupported
    }
  }

  // Soft tactile stone click for button feedback
  public playSoftTap() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine();
