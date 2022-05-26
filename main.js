const canvas = document.getElementById('myCanvas');

canvas.width = 200; // Just a narrow road, whee.

const context = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI", "blue", 6);

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY"),
];

animate();


function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    context.save();
    context.translate(0, canvas.height * 0.7 -car.y);

    road.draw(context);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(context);
    }
    car.draw(context);

    context.restore();

    requestAnimationFrame(animate);
}
