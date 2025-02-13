import { DFSGenerator } from './DFSGenerator.js'

export function testDFS () {
    let lab = new DFSGenerator(9, 5, {
        difficulty: 0.5,
        diagonalProbability: 0.4,
    });
    lab.generate(4, 4);
    return lab
}
