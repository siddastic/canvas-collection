import {Scene} from "smurf-engine";
import { GalacticLightTrails } from "./components/galactic-light-trail";
import engine from "./setup";


const scene = new Scene();


scene.addGameObject(GalacticLightTrails);

engine.loadScene(scene);