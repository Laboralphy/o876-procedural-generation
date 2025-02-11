const LabyrinthGenerator = require('./LabyrinthGenerator')

// Test du générateur
let lab = new LabyrinthGenerator(15, 15);
lab.difficulty = 0.4
lab.diagonalProbability = 0.5
lab.generate(4, 4);
lab.display();