const LabyrinthGrid = require('./LabyrinthGrid')

class DFSGenerator extends LabyrinthGrid {
    constructor(width, height) {
        super (width, height)
    }

    generate(startX = 0, startY = 0) {
        this.carve(startX, startY)
        this.corridorPostProcessing()
    }

    carve(x, y) {
        let directions = this
            .directions
            .slice()
            .sort(() => Math.random() - 0.5)

        this._grid[y][x].carve()

        for (let [dx, dy] of directions) {
            let nx = x + dx, ny = y + dy

            // Réduction des diagonales (ex: 40% de chance d'être creusées)
            if (this.isDiagonal(dx, dy) && Math.random() > this.parameters.diagonalProbability) {
                continue
            }

            if (this.isValid(nx, ny)) {
                this._grid[y][x].open(dx, dy)
                this._grid[ny][nx].open(-dx, -dy)
                this.carve(nx, ny)
            }
        }
    }
}

module.exports = DFSGenerator