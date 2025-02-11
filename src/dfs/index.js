const DFS = require('./DFSGenerator')
const RMD = require('./RMDGenerator')

function testDFS () {
    let lab = new DFS(15, 15);
    lab.difficulty = 0.4
    lab.diagonalProbability = 0.5
    lab.generate(4, 4);
    lab.display();
}

function testRMD () {
    let lab = new RMD(15, 15);
    lab.difficulty = 0
    lab.generate();
    lab.display();
}

testRMD()

