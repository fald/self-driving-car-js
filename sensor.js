class Sensor {
    constructor(car, rayCount=3, rayLength=100, raySpread=Math.PI/4) {
        this.car = car;
        this.rayCount = rayCount;
        this.rayLength = rayLength;
        this.raySpread = raySpread;

        this.rays = [];
    }
}
