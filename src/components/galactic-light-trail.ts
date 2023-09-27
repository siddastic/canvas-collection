import { Component, GameObject, Vector2 } from "smurf-engine";
import engine from "../setup";

interface Particle{
    position: Vector2;
    radius: number;
    color: string;
}


export class Particles extends Component {
    _particles : Array<Particle> = [];
    _maxSize = new Vector2(this.cx.canvas.width, this.cx.canvas.height);
    start(): void {
        this.transform.size = this._maxSize

        // populate particles
        for (let i =0;i < 200; i++){
            this._particles.push({
                position: new Vector2(Math.random() * this._maxSize.x, Math.random() * this._maxSize.y),
                radius: Math.random() * 2,
                color: 'white'
            });
        }
    }
    update(): void {
        this.cx.fillStyle = 'black';
        this.cx.fillRect(0, 0, this._maxSize.x, this._maxSize.y);

        this._particles.forEach(particle => {
            this.cx.beginPath();
            this.cx.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2);
            this.cx.fillStyle = particle.color;
            this.cx.fill();
        });
    }
}

const GalacticLightTrails = new GameObject({
    name: "Galactic Light Trails",
    engine,
});

GalacticLightTrails.addComponent(Particles);

export { GalacticLightTrails };