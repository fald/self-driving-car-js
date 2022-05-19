class Sensor {
    constructor(car, rayCount=12, rayLength=100, raySpread=Math.PI/3) {
        this.car = car;
        this.rayCount = rayCount;
        this.rayLength = rayLength;
        this.raySpread = raySpread;

        this.rays = [];

        this.readings = []; // is there a border? How far is it?
    }


    #castRays() {
        this.rays = []; // clear the rays
        
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount == 1? 0.5 : i / (this.rayCount - 1) // i doesn't become rayCount, so -1 ...but what if rayCount == 1?
            ) + this.car.angle;

            const startPoint = {
                x: this.car.x,
                y: this.car.y
            }
            const endPoint = {
                x: startPoint.x - this.rayLength * Math.sin(rayAngle),
                y: startPoint.y - this.rayLength * Math.cos(rayAngle)
            }

            this.rays.push([startPoint, endPoint]);
        }
    }


    draw(context) {

        context.beginPath();
        context.strokeStyle = "yellow";

        for (let i = 0; i < this.rayCount; i++) {
            const ray = this.rays[i];

            context.lineWidth = 2;
            context.moveTo(ray[0].x, ray[0].y);
            context.lineTo(ray[1].x, ray[1].y);
            context.stroke();
        }
    }


    #getReading(ray, roadBorders) {
        let touches = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const touch = this.getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            )

            if (touch) {
                touches.push(touch);
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            // Ew.
            const offsets = touches.map(e => e.offsets);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offsets == minOffset);
        }
    }


    update(roadBorders) {
        this.#castRays();

        readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders)
            )
        }
    }
}
