import {read} from "../file_reader.js";

function solve(lines) {
    let totalEnergy = 0;
    const expectedSize = 12;

    for (const bank of lines) {
        let startingPosition = 0;
        const energyBank = [];

        for (let i = 0; i < bank.length; i++) {
            let largest = -Infinity;
            const upUntil = bank.length - expectedSize + energyBank.length + 1;

            for (let j = startingPosition; j < upUntil; j++) {
                if (bank[j] > largest) {
                    startingPosition = j + 1;
                    i = j;
                    largest = bank[j];
                }
            }

            energyBank.push(largest);

            if (energyBank.length === 12) {
                const currentEnergy = Number.parseInt(energyBank.join(""));
                totalEnergy += currentEnergy;
                break;
            }
        }
    }

    return totalEnergy;
}

// read("./example.txt", solve);
// read("./test.txt", solve);
read("./input.txt", solve);
