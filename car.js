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

        this.polygon = [];
        this.damaged = false;

        this.sensor = new Sensor(this);
        this.controls = new Controls();
    }


    #createPolygon() {
        // Well, create rectangle, but whatever.
        const points = [];

        // From center to corners
        const radius = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.height, this.width);

        // Remember that the unit circle is rotated 90 degrees
        // Account for car's rotation, too
        points.push(
            // Front-right
            {x: this.x - Math.cos(-this.angle - alpha + Math.PI) * radius, 
                y: this.y - Math.sin(-this.angle - alpha + Math.PI) * radius},
            // Front-left
            {x: this.x - Math.cos(-this.angle + alpha + Math.PI) * radius, 
                y: this.y - Math.sin(-this.angle + alpha + Math.PI) * radius},
            // Rear-left
            {x: this.x - Math.cos(-this.angle - alpha) * radius, 
                y: this.y - Math.sin(-this.angle - alpha) * radius},
            // Rear-right
            {x: this.x - Math.cos(-this.angle + alpha) * radius, 
                y: this.y - Math.sin(-this.angle + alpha) * radius}
        );

        return points;
    }


    #assessDamage(roadBorders) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polyIntersect(this.polygon, roadBorders[i])) {
                return true;
            }
        }
        return false;
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


    draw(context) {
        // context.save();
        // context.translate(this.x, this.y);
        // context.rotate(-this.angle);

        // context.beginPath();
        // context.rect(
        //     -this.width / 2, 
        //     -this.height / 2, 
        //     this.width, 
        //     this.height
        // );
        // context.fill();

        // context.restore();

        // We can instead use our polygon to draw the car
        if (this.damaged) {
            context.fillStyle = 'red';
        } else {
            context.fillStyle = 'green';
        }

        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            context.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        context.fill();

        this.sensor.draw(context);
    }


    update(roadBorders) {
        this.#move();
        this.polygon = this.#createPolygon();
        this.damaged = this.#assessDamage(roadBorders);
        this.sensor.update(roadBorders);
    }
}
