const carCanvas = document.getElementById('carCanvas');
const networkCanvas = document.getElementById('networkCanvas');

carCanvas.width = 200; // Just a narrow road, whee.
networkCanvas.width = 300;

const carContext = carCanvas.getContext('2d');
const networkContext = networkCanvas.getContext('2d');

const N = 100;

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const cars = generateCars(N);

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY"),
];

animate();


function generateCars(N) {
    const cars = [];

    for (let i = 1; i < N; i++) {
        cars.push(
            new Car(road.getLaneCenter(1), 100, 30, 50, "AI", "blue", 6)
        );
    }

    return cars;
}


function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carContext.save();
    carContext.translate(0, carCanvas.height * 0.7 -cars[0].y);

    road.draw(carContext);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext);
    }

    carContext.globalAlpha = 0.5;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carContext);
    }
    carContext.globalAlpha = 1;

    carContext.restore();

    Visualizer.drawNetwork(networkContext, cars[0].brain);

    requestAnimationFrame(animate);
}
