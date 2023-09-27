import { Component, GameObject, Vector2 } from "smurf-engine";
import engine from "../setup";

interface Particle{
    position: Vector2;
    radius: number;
    color: string;
}


export class Particles extends Component {
    _particles : Array<Particle> = [];
    start(): void {
        this.transform.size = new Vector2(this.cx.canvas.width, this.cx.canvas.height);
    }
    update(): void {
        
    }
}

const GalacticLightTrails = new GameObject({
    name: "Galactic Light Trails",
    engine,
});

GalacticLightTrails.addComponent(Particles);

export { GalacticLightTrails };