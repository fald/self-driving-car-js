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
        this.turnSpeed = 0.03;

        this.controls = new Controls();
    }


    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle);

        context.beginPath();
        context.rect(
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        );
        context.fill();

        context.restore();
    }


    #move() {
        if (this.controls.forward) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
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
            this.angle += this.turnSpeed * this.speed / this.maxSpeed;
        }
        if (this.controls.right) {
            this.angle -= this.turnSpeed * this.speed / this.maxSpeed;
        }

        // Update position
        // Inverted cos/sin since the unit circle is rotated 90 degrees
        this.x += Math.sin(this.angle) * -this.speed;
        this.y += Math.cos(this.angle) * -this.speed;
    }


    update(context) {
        this.#move();
    }
}
