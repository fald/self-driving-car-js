class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.acceleration = 0.2;
        this.speed = 0;
        this.maxSpeed = 5;
        this.maxReverse = -3;
        this.friction = 0.05;
        this.angle = 0;
        this.turnSpeed = 0.1;

        this.controls = new Controls();
    }

    draw(context) {
        context.beginPath();
        context.rect(
            this.x - this.width / 2, 
            this.y - this.height / 2, 
            this.width, this.height
            );
        context.fill();
    }

    update() {
        if (this.controls.forward) {
            this.speed = Math.max(this.speed + this.acceleration, this.maxSpeed);
        }
        if (this.controls.reverse) {
            this.speed = Math.max(this.speed - this.acceleration, this.maxReverse);
        }

        // friction
        if (this.speed > 0) {
            this.speed -= this.friction;
        } else if (this.speed < 0) {
            this.speed += this.friction;
        }

        // Turn - based on a unit circle with 0 degrees at the top
        if (this.controls.left) {
            this.angle += this.turnSpeed;
        }
        if (this.controls.right) {
            this.angle -= this.turnSpeed;
        }

        this.y -= this.speed;
    }
}
