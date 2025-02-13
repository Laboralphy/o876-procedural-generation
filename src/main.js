import {
    createElement,
    clearElement,
    generateCanvasGrid
} from './ui/dom.js'

import { DFSGenerator } from './dfs/DFSGenerator.js'
import { RoomRenderer } from "./ui/RoomRenderer.js";

function generate({
    difficulty, diagonalProbability, width, height
}) {
    let lab = new DFSGenerator(width, height, {
        difficulty,
        diagonalProbability,
    });
    lab.generate(0, 0);

    const rr = new RoomRenderer()

    generateCanvasGrid(
        document.querySelector('.grid-container > canvas'),
        lab.width, lab.height,
        32, 32,
        (canvas, x, y) => {
            rr.render(lab.getCell(x, y), canvas)
        }
    )
}

export function generateFromParams () {
    const width = parseInt(document.querySelector('.generator-parameters input[name="width"]')?.value || 2)
    const height = parseInt(document.querySelector('.generator-parameters input[name="height"]')?.value || 2)
    const difficulty = parseInt(document.querySelector('.generator-parameters input[name="difficulty"]')?.value || 0.5)
    const diagonalProbability = parseInt(document.querySelector('.generator-parameters input[name="diag-prob"]')?.value || 0.5)
    generate({difficulty, diagonalProbability, width, height})
}

function main () {
    document.querySelector('.generator-parameters .generate').addEventListener('click', generateFromParams)
}

window.addEventListener('DOMContentLoaded', main)