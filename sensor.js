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


    #getReading(ray, roadBorders, traffic) {
        let touches = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );

            if (touch) {
                touches.push(touch);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;
            for (let j = 0; j < poly.length; j++) {
                const touch = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j + 1) % poly.length]
                );

                if (touch) {
                    touches.push(touch);
                }
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }
    

    draw(context) {
        context.lineWidth = 2;

        for (let i = 0; i < this.rayCount; i++) {
            const ray = this.rays[i];
            let end = ray[1];
            if (this.readings[i]) {
                end = this.readings[i]; // stop drawing at the intersection
                context.strokeStyle = "red";
            } else {
                context.strokeStyle = "yellow";
            }

            context.beginPath();
            context.moveTo(ray[0].x, ray[0].y);
            context.lineTo(end.x, end.y);
            context.stroke();
        }
    }


    update(roadBorders, traffic) {
        this.#castRays();

        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders, traffic)
            )
        }
    }
}
