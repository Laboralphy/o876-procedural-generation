export class Screen {
    constructor (width, height) {
        this._chars = null
        this.setSize(width, height)
    }

    setSize (width, height) {
        this._width = width
        this._height = height
        this._chars = Array(height).fill(null).map(() => Array(width).fill(' '))
    }

    setChar (x, y, c) {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            this._chars[y][x] = c.charAt(0)
        }
    }

    print (x, y, s) {
        s.split('').forEach((c, i) => this.setChar(x + i, y, c))
    }

    render () {
        return this._chars.map(row => row.join('')).join('\n')
    }
}
