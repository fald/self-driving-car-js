class Road {
    constructor(x, width, laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.cars = [];

        this.left = x - width / 2;
        this.right = x + width / 2;

        const inf = 1000000;
        this.top = -inf;
        this.bottom = inf;
    }

    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );

            // Edges
            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke();
        }

        // context.beginPath();
        // context.moveTo(this.right, this.top);
        // context.lineTo(this.right, this.bottom);
        // context.stroke();
    }
}

function lerp(A, B, t) {
    return A + (B - A) * t;
}
