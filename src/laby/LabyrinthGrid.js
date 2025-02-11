const DIRECTIONS = require('./data/directions.json')

const Room = require('./Room')
const Screen = require('./Screen')

class LabyrinthGrid {
    /**
     *
     * @param width {number}
     * @param height {number}
     * @param difficulty {number}
     * @param diagonalProbability {number}
     */
    constructor(width, height, {
        difficulty = 1,
        diagonalProbability = 0.4
    } = {}) {
        this.parameters = {
            diagonalProbability,
            difficulty
        }
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
    }

    /**
     * Open a corridor in the specified room and in the corresponding destination room
     * @param x {number} room x coord
     * @param y {number} room y coord
     * @param sDirection {string} direction name
     */
    openCorridor(x, y, sDirection) {
        const [dx, dy] = DIRECTIONS[sDirection]
        const nx = x + dx, ny = y + dy
        if (this.isInsideGrid(nx, ny) && this.isInsideGrid(x, y)) {
            this._grid[y][x].open(dx, dy)
            this._grid[y + dy][x + dx].open(-dx, -dy)
        }
    }

    /**
     * Close a corridor in the specified room and in the corresponding destination room
     * @param x {number} room x coord
     * @param y {number} room y coord
     * @param sDirection {string} direction name
     */
    closeCorridor(x, y, sDirection) {
        const [dx, dy] = DIRECTIONS[sDirection]
        const nx = x + dx, ny = y + dy
        if (this.isInsideGrid(nx, ny) && this.isInsideGrid(x, y)) {
            this._grid[y][x].close(dx, dy)
            this._grid[y + dy][x + dx].close(-dx, -dy)
        }
    }

    /**
     * Checks if two corridors are crossing each other.
     * O O
     *  X   <-- prevents this corridor pattern
     * O O
     *
     * @param x {number} room x coord
     * @param y {number} room y coord
     * @returns {boolean}
     */
    checkXCorridors (x, y) {
        return this._grid[y][x].exits.se && this._grid[y + 1][x + 1].exits.nw &&
            this._grid[y + 1][x].exits.ne && this._grid[y][x + 1].exits.sw
    }

    /**
     * Replace X corridor by a square pattern
     */
    corridorPostProcessing () {
        this.forEachRoom(({ x, y }) => {
            if (this.checkXCorridors(x, y)) {
                this.closeCorridor(x, y, 'se')
                this.closeCorridor(x + 1, y, 'sw')
                this.openCorridor(x, y, 'e')
                this.openCorridor(x, y, 's')
                this.openCorridor(x + 1, y + 1, 'e')
                this.openCorridor(x + 1, y + 1, 'n')
            } else {
                if (Math.random() < (1 - this.parameters.difficulty)) {
                    this.openCorridor(x, y, 'e')
                }
                if (Math.random() < (1 - this.parameters.difficulty)) {
                    this.openCorridor(x, y, 's')
                }
            }
        })
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

    forEachRoom (f) {
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                f(this._grid[y][x])
            }
        }
    }

    display() {
        const screen = new Screen(this.width * 4 , this.height * 2)
        this.forEachRoom(r => r.render(screen))
        console.log(screen.render());
    }
}

module.exports = LabyrinthGrid