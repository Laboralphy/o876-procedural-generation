const DIRECTIONS = require('./data/directions.json')

const Room = require('./Room')
const Screen = require('./Screen')

class LabyrinthGenerator {
    constructor(width, height) {
        this.difficulty = 1
        this.diagonalProbability = 0.4
        this.width = width;
        this.height = height;
        this._grid = Array(height)
            .fill(null)
            .map((_, y) => Array(width)
                .fill(null)
                .map((_, x) => new Room(x, y))
            )
        this.directions = Object.values(DIRECTIONS)
    }

    generate(startX = 0, startY = 0) {
        this.carve(startX, startY)
        this.simplifyXCorridors()
        return this._grid
    }

    carve(x, y) {
        let directions = this
            .directions
            .slice()
            .sort(() => Math.random() - 0.5)

        this._grid[y][x].carved = true

        for (let [dx, dy] of directions) {
            let nx = x + dx, ny = y + dy

            // Réduction des diagonales (ex: 40% de chance d'être creusées)
            if (this.isDiagonal(dx, dy) && Math.random() > this.diagonalProbability) {
                continue
            }

            if (this.isValid(nx, ny)) {
                this._grid[y][x].open(dx, dy)
                this._grid[ny][nx].open(-dx, -dy)
                this.carve(nx, ny)
            }
        }
    }

    openCorridor(x, y, sDirection) {
        const [dx, dy] = DIRECTIONS[sDirection]
        const nx = x + dx, ny = y + dy
        if (this.isInsideGrid(nx, ny) && this.isInsideGrid(x, y)) {
            this._grid[y][x].open(dx, dy)
            this._grid[y + dy][x + dx].open(-dx, -dy)
        }
    }

    closeCorridor(x, y, sDirection) {
        const [dx, dy] = DIRECTIONS[sDirection]
        const nx = x + dx, ny = y + dy
        if (this.isInsideGrid(nx, ny) && this.isInsideGrid(x, y)) {
            this._grid[y][x].close(dx, dy)
            this._grid[y + dy][x + dx].close(-dx, -dy)
        }
    }

    checkXCorridors (x, y) {
        return this._grid[y][x].exits.se && this._grid[y + 1][x + 1].exits.nw &&
            this._grid[y + 1][x].exits.ne && this._grid[y][x + 1].exits.sw
    }

    simplifyXCorridors () {
        for (let y = 0; y < this.height - 1; ++y) {
            for (let x = 0; x < this.width - 1; ++x) {
                if (this.checkXCorridors(x, y)) {
                    this.closeCorridor(x, y, 'se')
                    this.closeCorridor(x + 1, y, 'sw')
                    this.openCorridor(x, y, 'e')
                    this.openCorridor(x, y, 's')
                    this.openCorridor(x + 1, y + 1, 'e')
                    this.openCorridor(x + 1, y + 1, 'n')
                } else {
                    if (Math.random() < (1 - this.difficulty)) {
                        this.openCorridor(x, y, 'e')
                    }
                    if (Math.random() < (1 - this.difficulty)) {
                        this.openCorridor(x, y, 's')
                    }
                }
            }
        }
    }

    isDiagonal(dx, dy) {
        return Math.abs(dx) + Math.abs(dy) === 2
    }

    isInsideGrid (x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
    }

    isValid(x, y) {
        return this.isInsideGrid(x, y) && this._grid[y][x].carved === false;
    }

    display() {
        const screen = new Screen(this.width * 2 , this.height * 2)
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                this._grid[y][x].render(screen)
            }
        }
        console.log(screen.render());
    }
}

module.exports = LabyrinthGenerator