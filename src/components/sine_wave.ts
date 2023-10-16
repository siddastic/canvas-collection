import { Component, GameObject, Vector2, autobind } from "smurf-engine";
import engine from "../setup";

class SineWaveManager extends Component {
  private maxSize = new Vector2(this.cx.canvas.width, this.cx.canvas.height);
  wavelength = .01;
  amplitude = 100;
  frequency = .01;
  xIncrement = 0;
  shouldLeaveTrail = false;
  hueRange = 1;
  start(): void {
    this.transform.size = this.maxSize;
    this.xIncrement = this.frequency;
    engine.clearCanvas = () => { };
    console.log(this);
  }


  update(): void {
    this.cx.beginPath();
    this.cx.moveTo(0, this.maxSize.y / 2);
    this.cx.fillStyle = `rgba(0,0,0,${this.shouldLeaveTrail ? 0.01 : 1})`;
    this.cx.fillRect(0, 0, this.maxSize.x, this.maxSize.y);
    for (let i = 0; i < this.maxSize.x; i++) {
      this.cx.lineTo(i, this.maxSize.y / 2 + Math.sin(i * this.wavelength + this.xIncrement) * this.amplitude * Math.sin(this.xIncrement));
    }
    this.cx.strokeStyle = `hsl(${this.hueRange * Math.abs(Math.sin(this.xIncrement))}, 100%, 50%)`;
    this.cx.stroke();

    this.xIncrement += this.frequency;
  }
}

class AudioManager extends Component {
  playBtn = document.createElement("button");
  audioElement = document.createElement("audio");
  analyser!: AnalyserNode;
  dataArray!: Uint8Array;
  waveManager!: SineWaveManager;
  start(): void {
    this.playBtn.innerText = "Play Audio";
    this.playBtn.style.position = "absolute";
    this.playBtn.style.left = "0";
    this.playBtn.style.top = "0";
    this.playBtn.addEventListener("click", this.playAudio);
    document.body.appendChild(this.playBtn);
    this.audioElement.src = "./music.mp3";
    document.body.appendChild(this.audioElement);
    this.waveManager = this.gameObject.getComponent<SineWaveManager>(SineWaveManager)!;
    console.log(this.audioElement);
  }

  @autobind
  async playAudio() {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(this.audioElement);

    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    gainNode.connect(audioCtx.destination);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    gainNode.connect(analyser);

    // now instead of connecting to aCtx.destination, connect to the gainNode
    source.connect(gainNode);

    this.audioElement.currentTime = 80;
    this.audioElement.play();

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    this.analyser = analyser;
    this.dataArray = dataArray;
  }

  update(): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.dataArray);
      const average = this.dataArray.reduce((acc, curr) => acc + curr, 0) / this.dataArray.length;
      this.waveManager.amplitude = average;
      // this.waveManager.frequency = average / 1000;
      this.waveManager.wavelength = average / 1000;
      // this.waveManager.hueRange = average / 100;
      this.waveManager.xIncrement += average / 100000;

      let currentTime = this.audioElement.currentTime;
      if (currentTime >= 100 && currentTime <= 150) {
        this.waveManager.shouldLeaveTrail = true;
        this.waveManager.hueRange = 100;
      }
      if (currentTime >= 150 && currentTime <= 200) {
        this.waveManager.shouldLeaveTrail = false;
        this.waveManager.hueRange = 150;
      }
      if (currentTime >= 200) {
        this.waveManager.shouldLeaveTrail = true;
        this.waveManager.hueRange = 300;
      }
    }
  }
}


const SineWave = new GameObject({
  name: "SineWave",
  engine: engine,
});

SineWave.addComponent(SineWaveManager);
SineWave.addComponent(AudioManager);

export default SineWave;
