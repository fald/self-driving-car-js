class Controls {
    constructor(controlType, car) {
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;

        switch(controlType) {
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "AI":
                this.car = car;
                this.#addAI();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    
    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
            // console.table(this);
        }

        document.onkeyup = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
            // console.table(this);
        }
    }


    #addAI() {
        this.brain = new NeuralNetwork(
            this.car.sensor.rayCount,
            6, // 1 hidden layer with 6 nodes
            4, // 4 outputs - fwd, back, left, right
        );
    }
}
