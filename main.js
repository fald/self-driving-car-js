const carCanvas = document.getElementById('carCanvas');
const networkCanvas = document.getElementById('networkCanvas');

carCanvas.width = 200; // Just a narrow road, whee.
networkCanvas.width = 300;

const carContext = carCanvas.getContext('2d');
const networkContext = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
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

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carContext.save();
    carContext.translate(0, carCanvas.height * 0.7 -car.y);

    road.draw(carContext);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext);
    }
    car.draw(carContext);

    carContext.restore();

    Visualizer.drawNetwork(networkContext, car.brain);

    requestAnimationFrame(animate);
}
