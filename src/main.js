import {
    createElement,
    clearElement,
    generateCanvasGrid
} from './ui/dom.js'

import { DFSGenerator } from './dfs/DFSGenerator.js'
import { RoomRenderer } from "./ui/RoomRenderer.js";

function main() {
    let lab = new DFSGenerator(9, 9, {
        difficulty: 0.5,
        diagonalProbability: 0.4,
    });
    lab.generate(0, 0);

    const rr = new RoomRenderer()

    generateCanvasGrid(
        document.querySelector('div.grid-container > canvas'),
        lab.width, lab.height,
        32, 32,
        (canvas, x, y) => {
            rr.render(lab.getCell(x, y), canvas)
        }
    )
}

window.addEventListener('load', main)