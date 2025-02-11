const LINKS = require('./links.json')

class Cell {
    /**
     * @param x {number}
     * @param y {number}
     */
    constructor (x = 0, y = 0) {
        /**
         * @type {Array<string>}
         * @private
         */
        this._possibilities = []
        this._x = x
        this._y = y
        this._value = null // collapsed value
        this._data = {} // custom data
    }

    get data () {
        return this._data
    }

    get value () {
        return this._value
    }

    set value (value) {
        this._value = value
        this._possibilities = [value]
    }

    /**
     * @returns {{x: number, y: number, z: number}}
     */
    get position () {
        return {
            x: this._x,
            y: this._y
        }
    }

    /**
     * @returns {string[]}
     */
    get possibilities () {
        return this._possibilities
    }

    set possibilities (value) {
        this._possibilities = value
        if (value.length === 1 && this.value === null) {
            this._value = value[0]
        }
    }

    restrictPossibilities (aPossibilities) {
        const aPosSet = new Set(aPossibilities)
        this.possibilities = this._possibilities.filter(p => aPosSet.has(p))
    }

    /**
     * @param possibility {string}
     */
    addPossibility (possibility) {
        if (!this._possibilities.includes(possibility)) {
            this._possibilities.push(possibility)
        }
    }

    get entropy () {
        return this._possibilities.length
    }

    /**
     * @returns {boolean}
     */
    get isUnresolved () {
        return this.entropy > 1
    }

    get isResolved () {
        return this.entropy === 1
    }

    get hasNoPossibilities () {
        return this.entropy === 0
    }
}

module.exports = Cell