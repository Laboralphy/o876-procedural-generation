import { LabyrinthGrid } from '../laby/LabyrinthGrid.js'

export class DFSGenerator extends LabyrinthGrid {
    constructor(width, height, parameters) {
        super (width, height, parameters)
    }

    generate(startX = 0, startY = 0) {
        this.carve(startX, startY)
        this.preventCrossingCorridors()
        this.applyDifficulty()
        this.computeDistance(this.getCell(startX, startY))
    }

    carve(x, y) {
        let directions = this
            .directions
            .slice()
            .sort(() => Math.random() - 0.5)

        this._grid[y][x].carve()

        const diagProb = this.parameters.diagonalProbability

        for (let [dx, dy] of directions) {
            let nx = x + dx, ny = y + dy

            // Réduction des diagonales (ex: 40% de chance d'être creusées)
            if (this.isDiagonal(dx, dy) && Math.random() > diagProb) {
                continue
            }

            if (this.isCarvable(nx, ny)) {
                this.openCorridor(x, y, dx, dy)
                this.carve(nx, ny)
            }
        }
    }
}
