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
        context.strokeStyle = '#000000';

        // Edges
        context.beginPath();
        context.moveTo(this.left, this.top);
        context.lineTo(this.left, this.bottom);
        context.stroke();

        context.beginPath();
        context.moveTo(this.right, this.top);
        context.lineTo(this.right, this.bottom);
        context.stroke();
    }
}
