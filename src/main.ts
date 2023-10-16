import { Scene } from "smurf-engine";
import { GalacticLightTrails } from "./components/galactic-light-trail";
import engine from "./setup";
import { StarSky } from "./components/star-sky";
import SineWave from "./components/sine_wave";


const scene = new Scene();


scene.addGameObject(SineWave);

engine.loadScene(scene);
