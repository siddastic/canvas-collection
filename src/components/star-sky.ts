import { Component, GameObject, Vector2 } from "smurf-engine";
import engine from "../setup";

interface Particle {
    position: Vector2;
    radius: number;
    color: string;
    speed: number;
}

type particleDir = "left" | "right" | "up" | "down";

class StarSkyParticleManager extends Component {
    _particles: Array<Particle> = [];
    _colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66', '#FFC1C1'];
    _maxSize = new Vector2(this.cx.canvas.width, this.cx.canvas.height);
    direction: particleDir = "right";
    start(): void {
        this.cx.canvas.style.backgroundColor = "black";
        this.transform.size = this._maxSize

        // populate particles
        for (let i = 0; i < 1000; i++) {
            let canvasSize = new Vector2(this._maxSize.x, this._maxSize.y);
            let x = (Math.random() * canvasSize.x);
            let y = (Math.random() * canvasSize.y);
            this._particles.push({
                position: new Vector2(x, y),
                radius: Math.random() * 1.5 + .1,
                color: this._colors[Math.floor(Math.random() * this._colors.length)],
                speed: Math.random() + .2
            });
        }
    }
    update(): void {
        // move and draw the particles based on speed across x axis
        this._particles.forEach(particle => {
            // move the particle based on direction
            if (this.direction === "left") {
                particle.position.x -= particle.speed;
            } else if (this.direction === "right") {
                particle.position.x += particle.speed;
            }
            else if (this.direction === "up") {
                particle.position.y -= particle.speed;
            }
            else if (this.direction === "down") {
                particle.position.y += particle.speed;
            }
            this.cx.beginPath();
            this.cx.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false);
            this.cx.fillStyle = particle.color;
            this.cx.fill();
            this.cx.closePath();
        });

        // reset particles that have moved off the screen
        this._particles.forEach(particle => {
            if (particle.position.x > this._maxSize.x) {
                particle.position.x = 0;
            }

            if (particle.position.y > this._maxSize.y) {
                particle.position.y = 0;
            }

            if (particle.position.x < 0) {
                particle.position.x = this._maxSize.x;
            }

            if (particle.position.y < 0) {
                particle.position.y = this._maxSize.y;
            }
        });

        // change direction based on mouse position
        this.changeDirectionBasedOnMousePosition();
    }

    changeDirectionBasedOnMousePosition() {
        let dir: particleDir = "right";
        let mousePosition = this.input.getMousePosition();
        if (mousePosition.x < this._maxSize.x / 2 && mousePosition.y < this._maxSize.y / 2) {
            dir = "up";
        } else if (mousePosition.x < this._maxSize.x / 2 && mousePosition.y > this._maxSize.y / 2) {
            dir = "left";
        }
        else if (mousePosition.x > this._maxSize.x / 2 && mousePosition.y < this._maxSize.y / 2) {
            dir = "right";
        }
        else if (mousePosition.x > this._maxSize.x / 2 && mousePosition.y > this._maxSize.y / 2) {
            dir = "down";
        }
        this.direction = dir;
    }
}

const StarSky = new GameObject({
    name: "Star Sky",
    engine,
});

StarSky.addComponent(StarSkyParticleManager);

export { StarSky };