const Cell = require('./Cell')

class WFCGenerator {
    constructor ({
        size: [x = 1, y = 1] = [],
        probabilities = null,
        rules = null,
        random = Math.random
    } = {}) {
        this._cells = []
        this._probabilities = {}
        this._rules = {}
        if (probabilities) {
            this.probabilities = probabilities
        }
        if (rules) {
            this.rules = rules
        }
        this._xsize = 0
        this._ysize = 0
        this.setWorldSize(x, y)
        this._adjacentOffsets = null
        this._random = random
    }

    set probabilities (value) {
        Object
            .entries(value)
            .forEach(([s, v]) => {
                if (typeof v !== 'number') {
                    throw new TypeError(`probability ${s} must be a number`)
                }
                if (isNaN(v)) {
                    throw new TypeError(`probability ${s} is NaN`)
                }
                if (v < 0) {
                    throw new RangeError(`probability ${s} must be >= 0 (${v} given)`)
                }
            })
        this._probabilities = value
    }

    get probabilities () {
        return this._probabilities
    }

    set rules (value) {
        Object
            .entries(value)
            .forEach(([s, v]) => {
                if (!(s in this._probabilities)) {
                    throw new RangeError(`rule ${s} must be element of defined probabilities`)
                }
                if (!Array.isArray(v)) {
                    throw new TypeError(`rule ${s} must be an array of strings`)
                }
                const aMisfits = v.filter(x => !(x in this._probabilities))
                if (aMisfits.length > 0) {
                    throw new RangeError(`rule ${s} : some items are not in defined probabilities ${aMisfits.join(', ')}`)
                }
            })
        this._rules = value
    }

    get rules () {
        return this._rules
    }

    /**
     * @returns {function (): number}
     */
    get random () {
        return this._random
    }

    /**
     * @param value {function (): number}
     */
    set random (value) {
        if (typeof value === 'function') {
            this._random = value
        } else {
            throw new TypeError('Parameters needs to be a function')
        }
    }

    get adjacentOffsets () {
        if (!this._adjacentOffsets) {
            const a = []
            const aIterations = [-1, 0, 1]
            for (let dx of aIterations) {
                for (let dy of aIterations) {
                    let bPush = true
                    if (dx === 0 && dy === 0) {
                        bPush = false
                    }
                    if (bPush) {
                        a.push([dx, dy]);
                    }
                }
            }
            this._adjacentOffsets = a
        }
        return this._adjacentOffsets
    }

    /**
     * @returns {Cell[][]}
     */
    get cells () {
        return this._cells
    }

    /**
     * @returns {{x: number, y: number}}
     */
    get size () {
        return {
            x: this._xsize,
            y: this._ysize
        }
    }

    get possibilities () {
        return Object.keys(this._probabilities)
    }

    /**
     * @param x {number}
     * @param y {number}
     */
    setWorldSize (x = 1, y = 1) {
        this._xsize = x
        this._ysize = y
        this._cells = Array(y)
            .fill(null)
            .map((_, iy) => Array(x)
                .fill(null)
                .map((_, ix) => {
                    const cell = new Cell(ix, iy)
                    cell.possibilities = this.possibilities
                    return cell
                })
            )
    }

    /**
     * @returns {boolean}
     */
    hasUnresolvedCells () {
        for (let x = 0; x < this._xsize; ++x) {
            for (let y = 0; y < this._ysize; ++y) {
                const cell = this.getCell(x, y)
                if (cell && cell.isUnresolved) {
                    return true
                }
            }
        }
        return false
    }

    /**
     *
     * @param x {number}
     * @param y {number}
     * @returns {Cell|undefined}
     */
    getCell (x = 0, y = 0) {
        if (x < 0 || x >= this._xsize ||
            y < 0 || y >= this._ysize
        ) {
            return undefined
        }
        return this._cells[y]?.[x] ?? null
    }

    /**
     * @returns {Cell}
     */
    getLowestEntropyCell () {
        let minEntropy = Infinity
        const aCells = []
        this.forEachCell((cell) => {
            if (cell.isUnresolved && !cell.value) {
                const { entropy } = cell
                if (entropy < minEntropy) {
                    aCells.splice(0, aCells.length, cell)
                    minEntropy = entropy
                } else if (entropy === minEntropy) {
                    aCells.push(cell)
                }
            }
        })
        return aCells.length > 0
            ? aCells[Math.floor(this.random() * aCells.length)]
            : null
    }

    chooseElement (options) {
        let totalWeight = options.reduce((sum, item) => sum + this._probabilities[item], 0)
        let rnd = this.random() * totalWeight
        let cumulative = 0
        for (let item of options) {
            cumulative += this._probabilities[item]
            if (rnd < cumulative) {
                return item
            }
        }
        return options[0]
    }

    propagateConstraints(cell, value) {
        const { x, y } = cell.position
        const adjacentOffsets = this.adjacentOffsets
        for (let [dx, dy] of adjacentOffsets) {
            let nx = x + dx, ny = y + dy
            const oAdjCell = this.getCell(nx, ny)
            if (oAdjCell) {
                oAdjCell.restrictPossibilities(this._rules[value])
            }
        }
    }

    forEachCell (f) {
        for (let x = 0; x < this._xsize; ++x) {
            for (let y = 0; y < this._ysize; ++y) {
                const cell = this.getCell(x, y)
                if (cell) {
                    f(cell)
                }
            }
        }
    }

    init () {
        this.forEachCell((cell) => {
            cell.possibilities = Object.keys(this._probabilities)
        })
    }

    determineCell(cell, value) {
        this.propagateConstraints(cell, value)
        cell.value = value
    }

    runCell (cell) {
        this.determineCell(cell, this.chooseElement(cell.possibilities))
    }

    run ({
        maxIterations = Infinity,
    } = {}) {
        while (this.hasUnresolvedCells()) {
            this.runCell(this.getLowestEntropyCell())
            if (--maxIterations <= 0) {
                break
            }
        }
    }

    reset () {
        const p = Object.keys(this._probabilities)
        this.forEachCell((cell) => {
            cell.possibilities = p
        })
        return this
    }
}

module.exports = WFCGenerator
