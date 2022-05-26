class NeuralNetwork {
    constructor(neuronCounts) {
        // Where neuronCounts is the number of neurons in each layer.
        this.levels = [];
        // Populate it - 1 fewer than total number since last level includes the output layer.
        // Sure seems there was a better way to do this.
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(
            network.levels[0],
            givenInputs
        ); // need a starting output to feed into the loop below.

        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(
                network.levels[i],
                outputs
            );
        }
        
        return outputs;
    }
}


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
        // Initialize weights
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1; // -1 to 1
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1; // -1 to 1
        }
    }

    static feedForward(level, inputs) {
        // Feed forward - compute outputs
        // Set the inputs for a given level
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = inputs[i];
        }

        // Compute outputs
        // Loop through inputs, add: 
        // the product of the jth input and 
        // the weight of the jth input to the ith output
        // Repeated for every input neuron.
        // If the total sum > bias of output neuron, set the output to 1 (turned on)
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            if (sum > level.biases[i]) { // or sum + bias > 0, for more scientifically correct
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }
}
