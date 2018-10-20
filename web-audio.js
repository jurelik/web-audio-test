class Sound {
  constructor(context) {
    this.context = context;
  }
  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sawtooth';
  }
  play(freq, volume) {
    this.init();

    this.oscillator.frequency.value = freq;
    this.gainNode.gain.value = volume;

    this.oscillator.start();
    this.stop(this.context.currentTime);
  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    this.oscillator.stop(time + 0.5);
  }
}

let AudioContext = (window.AudioContext || window.webkitAudioContext);
let context = new AudioContext();
let note = new Sound(context);
let now = context.currentTime;

window.addEventListener('click', e => {
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;
  let freqUnit = 22050 / winWidth;
  let gainUnit = 1 /  winHeight;
  let freq = e.clientX * freqUnit;
  let volume = (winHeight - e.clientY) * gainUnit;

  note.play(freq, volume);
});