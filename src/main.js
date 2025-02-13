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

    lab.generate(1, 0);

    let nMaxDistance = 0
    lab.forEachRoom(room => {
        nMaxDistance = Math.max(nMaxDistance, room.distance)
    })

    const rr = new RoomRenderer()
    rr.maxDistance = nMaxDistance

    generateCanvasGrid(
        document.querySelector('.grid-container > canvas'),
        lab.width, lab.height,
        32, 32,
        (canvas, x, y) => {
            const room = lab.getCell(x, y)
            if (room !== null) {
                rr.render(lab.getCell(x, y), canvas)
            }
        }
    )
}

export function generateFromParams () {
    const width = parseInt(document.querySelector('.generator-parameters input[name="width"]')?.value || 2)
    const height = parseInt(document.querySelector('.generator-parameters input[name="height"]')?.value || 2)
    const difficulty = parseInt(document.querySelector('.generator-parameters input[name="difficulty"]')?.value || '50') / 100
    const diagonalProbability = parseInt(document.querySelector('.generator-parameters input[name="diag-prob"]')?.value || '50') / 100
    const pattern = parseInt(document.querySelector('.generator-parameters input[name="pattern"]')?.value || '')
    generate({difficulty, diagonalProbability, width, height, pattern})
}

function main () {
    document.querySelector('.generator-parameters .generate').addEventListener('click', generateFromParams)
}

window.addEventListener('DOMContentLoaded', main)