import { Component, GameObject, Vector2 } from "smurf-engine";
import engine from "../setup";

interface Particle {
    position: Vector2;
    radius: number;
    color: string;
}


export class ParticlesHandler extends Component {
    _particles: Array<Particle> = [];
    _colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66', '#FFC1C1'];
    _maxSize = new Vector2(this.cx.canvas.width, this.cx.canvas.height);
    rotationRadians = 0;
    backgroundAlpha = 1;
    start(): void {
        this.transform.size = this._maxSize

        // populate particles
        for (let i = 0; i < 500; i++) {
            let canvasSize = new Vector2(this._maxSize.x + 300, this._maxSize.y + 500);
            let x = (Math.random() * canvasSize.x) - canvasSize.x / 2;
            let y = (Math.random() * canvasSize.y) - canvasSize.y / 2;
            this._particles.push({
                position: new Vector2(x, y),
                radius: Math.random() * 2,
                color: this._colors[Math.floor(Math.random() * this._colors.length)]
            });
        }
    }
    update(): void {
        this.fillBackground();

        this.cx.save();
        this.rotateCanvas();
        this._particles.forEach(particle => {
            this.cx.beginPath();
            this.cx.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false);
            this.cx.shadowColor = particle.color;
            this.cx.shadowBlur = 15;
            this.cx.fillStyle = particle.color;
            this.cx.fill();
            this.cx.closePath();
        });
        this.cx.restore();
    }

    fillBackground() {
        this.cx.fillStyle = `rgba(10, 10, 10, ${this.backgroundAlpha})`;
        this.cx.fillRect(0, 0, this._maxSize.x, this._maxSize.y);

        if(this.input.getMouseKeyDown(0) && this.backgroundAlpha > 0.03){
            this.backgroundAlpha -= .01;
        }else if (!this.input.getMouseKeyDown(0) && this.backgroundAlpha < 1){
            this.backgroundAlpha += .01;
        }
    }

    rotateCanvas() {
        this.rotationRadians += .003;

        this.cx.translate(this._maxSize.x / 2, this._maxSize.y / 2);
        this.cx.rotate(this.rotationRadians);

    }
}

const GalacticLightTrails = new GameObject({
    name: "Galactic Light Trails",
    engine,
});

GalacticLightTrails.addComponent(ParticlesHandler);

export { GalacticLightTrails };