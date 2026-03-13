import {read} from "../file_reader.js";

function solve(lines) {
    let totalEnergy = 0;

    for (const bank of lines) {
        let large = -Infinity
        let largest = -Infinity;

        for (let i = 0; i < bank.length; i++) {
            const energy = bank[i];

            if (energy > largest && i < bank.length - 1) {
                largest = energy;
                if (large !== -Infinity) large = -Infinity;
            } else if (energy > large) {
                large = energy;
            }
        }

        totalEnergy += Number.parseInt(largest + large);
    }

    return totalEnergy;
}

read("./input.txt", solve);
