const DIRECTIONS = require('./data/directions.json')
const DECORATIONS = require('./data/decorations.json')

class Room {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.carved = false
        this.exits = Object.fromEntries(Object.keys(DIRECTIONS).map(d => [d, false]))
    }

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
        }
        return s
    }

    open (dx, dy) {
        this.exits[this.getDirection(dx, dy)] = true
    }

    close (dx, dy) {
        this.exits[this.getDirection(dx, dy)] = false
    }

    render (screen) {
        const x2 = this.x * 2
        const y2 = this.y * 2
        screen.setChar(x2, y2, this.carved ? DECORATIONS.room : DECORATIONS.empty)
        const aDirs = ['ne', 'e', 'se', 's']
        aDirs
            .filter(d => this.exits[d])
            .forEach(d => {
                const [dx, dy] = DIRECTIONS[d]
                screen.setChar(x2 + dx, y2 + dy, DECORATIONS[d])
            })
    }
}

module.exports = Room
