class Sensor {
    constructor(car, rayCount=3, rayLength=100, raySpread=Math.PI/4) {
        this.car = car;
        this.rayCount = rayCount;
        this.rayLength = rayLength;
        this.raySpread = raySpread;

        this.rays = [];
    }


    update() {
        this.rays = []; // clear the rays
        
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount - 1) // i doesn't become rayCount, so -1 
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
}
