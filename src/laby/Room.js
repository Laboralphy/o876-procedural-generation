import DIRECTIONS from './data/directions.json' with { type: 'json' }
import DECORATIONS from './data/decorations.json' with { type: 'json' }

export class Room {
    /**
     * @param x {number} x coord of room
     * @param y {number} y coord of room
     */
    constructor (x, y) {
        this._x = x
        this._y = y
        this._carved = false
        this._exits = Object.fromEntries(Object.keys(DIRECTIONS).map(d => [d, false]))
    }

    /**
     * returns x coord of room
     * @returns {number}
     */
    get x () {
        return this._x
    }

    /**
     * returns y coord of room
     * @returns {number}
     */
    get y () {
        return this._y
    }

    /**
     * returns all exits state (true = open / false = close)
     * @returns {{[p: string]: boolean}}
     */
    get exits () {
        return this._exits
    }

    /**
     * carves this room
     */
    carve () {
        this._carved = true
    }

    /**
     * uncarve this room
     */
    block () {
        this._carved = false
    }

    /**
     * returns true if room is carved
     * @returns {boolean}
     */
    get carved () {
        return this._carved
    }

    /**
     * set room carved state
     * @returns {boolean}
     */
    set carved (carved) {
        this._carved = carved
    }

    /**
     * By giving relative coords, returns the corresponding direction id
     * @param dx {-1|0|1}
     * @param dy {-1|0|1}
     * @returns {string}
     */
    getDirection (dx, dy) {
        let s = ''
        switch (dy) {
            case -1: {
                s += 'n'
                break
            }
            case 1: {
                s += 's'
                break
            }
            case 0: {
                break
            }
            default: {
                throw new RangeError('allowed values are -1, 0, 1')
            }
        }
        switch (dx) {
            case -1: {
                s += 'w'
                break
            }
            case 1: {
                s += 'e'
                break
            }
            case 0: {
                break
            }
            default: {
                throw new RangeError('allowed values are -1, 0, 1')
            }
        }
        return s
    }

    /**
     * Open exit
     * @param dx {number}
     * @param dy {number}
     */
    open (dx, dy) {
        this.exits[this.getDirection(dx, dy)] = true
    }

    /**
     * Close exit
     * @param dx {number}
     * @param dy {number}
     */
    close (dx, dy) {
        this.exits[this.getDirection(dx, dy)] = false
    }

    /**
     * Renders labyrinth to a screen
     * @param screen {Screen}
     */
    render (screen) {
        const x2 = this.x * 2
        const y2 = this.y * 2
        screen.setChar(x2, y2, this._carved ? DECORATIONS.room : DECORATIONS.empty)
        const aDirs = ['ne', 'e', 'se', 's']
        aDirs
            .filter(d => this.exits[d])
            .forEach(d => {
                const [dx, dy] = DIRECTIONS[d]
                screen.setChar(x2 + dx, y2 + dy, DECORATIONS[d])
            })
    }
}
