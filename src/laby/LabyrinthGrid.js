import DIRECTIONS from './data/directions.json' with { type: 'json' }

import { Room } from './Room.js'
import { Screen } from './Screen.js'

export class LabyrinthGrid {
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

    normalizeDirection (aDirection) {
        if (aDirection.length === 2) {
            if ((typeof aDirection[0] === 'number') && (typeof aDirection[1] === 'number')) {
                return aDirection
            } else {
                throw new TypeError('function direction signature invalid')
            }
        } else if (aDirection.length === 1) {
            if (typeof aDirection[0] === 'string') {
                return DIRECTIONS[aDirection]
            } else {
                throw new TypeError('function direction signature invalid')
            }
        } else {
            console.error(aDirection)
            throw new Error('parameter length invalid : ' + aDirection.length)
        }
    }

    /**
     * Open a corridor in the specified room and in the corresponding destination room
     * @param x {number} room x coord
     * @param y {number} room y coord
     * @param aDirection {[string]|[number, number]} direction name
     */
    openCorridor(x, y, ...aDirection) {
        const [dx, dy] = this.normalizeDirection(aDirection)
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
     * @param aDirection {[string]|[number, number]} direction name
     */
    closeCorridor(x, y, ...aDirection) {
        const [dx, dy] = this.normalizeDirection(aDirection)
        const nx = x + dx, ny = y + dy
        if (this.isInsideGrid(nx, ny) && this.isInsideGrid(x, y)) {
            this._grid[y][x].close(dx, dy)
            this._grid[y + dy][x + dx].close(-dx, -dy)
        }
    }

    computeDistance(room, distance = 0) {
        room.distance = distance
        this
            .getNeighbors(room)
            .filter(r => r.distance < 0)
            .forEach((neighbor) => {
                this.computeDistance(neighbor, distance + 1)
            })
    }

    getNeighbors(room) {
        const { x, y } = room
        return Object
            .entries(room.exits)
            .filter(([, bOpen]) => bOpen)
            .reduce((prev, [sDirection]) => {
                const [dx, dy] = DIRECTIONS[sDirection]
                prev.push(this.getCell(x + dx, y + dy))
                return prev
            }, [])
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
    checkCrossingCorridors (x, y) {
        return this._grid[y][x].exits.se && this._grid[y + 1][x + 1].exits.nw &&
            this._grid[y + 1][x].exits.ne && this._grid[y][x + 1].exits.sw
    }

    /**
     * Replace X corridor by a square pattern
     */
    preventCrossingCorridors () {
        this.forEachRoom(({ x, y }) => {
            if (this.checkCrossingCorridors(x, y)) {
                this.closeCorridor(x, y, 'se')
                this.closeCorridor(x + 1, y, 'sw')
                this.openCorridor(x, y, 'e')
                this.openCorridor(x, y, 's')
                this.openCorridor(x + 1, y + 1, 'e')
                this.openCorridor(x + 1, y + 1, 'n')
            }
        })
    }

    applyDifficulty () {
        this.forEachRoom(({ x, y }) => {
            if (Math.random() < (1 - this.parameters.difficulty)) {
                this.openCorridor(x, y, 'e')
            }
            if (Math.random() < (1 - this.parameters.difficulty)) {
                this.openCorridor(x, y, 's')
            }
        })
    }

    isDiagonal(dx, dy) {
        return Math.abs(dx) + Math.abs(dy) === 2
    }

    isInsideGrid (x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height && this._grid[y][x] !== null
    }

    isCarvable(x, y) {
        return this.isInsideGrid(x, y) && !this._grid[y][x].carved && !this._grid[y][x].sealed;
    }

    forEachRoom (f) {
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const cell = this._grid[y][x]
                if (cell) {
                    f(this._grid[y][x])
                }
            }
        }
    }

    getCell (x, y) {
        return this._grid[y][x]
    }

    display() {
        const screen = new Screen(this.width * 4 , this.height * 2)
        this.forEachRoom(r => r.render(screen))
        console.log(screen.render());
    }
}
