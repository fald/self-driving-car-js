const canvas = document.getElementById('myCanvas');

canvas.width = 200; // Just a narrow road, whee.

const context = canvas.getContext('2d');
const car = new Car(100, 100, 30, 50);

animate();

function animate() {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    car.update();
    canvas.height = window.innerHeight;
    car.draw(context);
    requestAnimationFrame(animate);
}
