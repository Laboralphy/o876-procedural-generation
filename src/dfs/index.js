const DFS = require('./DFSGenerator')

function testDFS () {
    let lab = new DFS(30, 15, {
        difficulty: 0.5,
        diagonalProbability: 0.4,
    });
    lab.generate(4, 4);
    lab.display();
}

testDFS()

