import {Scene} from "smurf-engine";
import { GalacticLightTrails } from "./components/galactic-light-trail";
import engine from "./setup";
import { StarSky } from "./components/star-sky";


const scene = new Scene();


scene.addGameObject(StarSky);

engine.loadScene(scene);