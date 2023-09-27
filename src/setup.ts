import { SmurfEngine } from "smurf-engine";

const canvas = document.querySelector("canvas")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new SmurfEngine(canvas);
engine.clearCanvas = () => {};

export default engine;