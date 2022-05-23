class Level {
    constructor(inputCount, outpuCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outpuCount);
        this.biases = new Array(outpuCount);

        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outpuCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1; // -1 to 1
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1; // -1 to 1
        }
    }
}
