const LabyrinthGrid = require('./LabyrinthGrid')

class RMDGenerator extends LabyrinthGrid {
    constructor(width, height) {
        super (width, height)
    }


    generate () {
        this.forEachRoom(room => {
            room.carve()
            if (room.y > 0) {
                room.exits.n = true
            }
            if (room.x < this.width - 1) {
                room.exits.e = true
            }
            if (room.y < this.height - 1) {
                room.exits.s = true
            }
            if (room.x > 0) {
                room.exits.w = true
            }
        })
        this.divide(0, 0, this.width, this.height);
    }

    divide(x, y, w, h) {
        this._grid[y][x].carve()
        if (w <= 2 || h <= 2) {
            return;
        }

        let horizontal = w < h;
        let wallX = x + (horizontal ? 0 : Math.floor(Math.random() * (w - 1)));
        let wallY = y + (horizontal ? Math.floor(Math.random() * (h - 1)) : 0);
        let passage = horizontal ? wallX + Math.floor(Math.random() * w) : wallY + Math.floor(Math.random() * h);

        for (let i = 0; i < (horizontal ? w : h); i++) {
            if (horizontal) {
                if (y + i !== passage) {
                    this.closeCorridor(wallX, y + 1, 'e')
                }
            } else {
                if (x + i !== passage) {
                    this.closeCorridor(x + i, wallY, 's')
                }
            }
        }

        if (horizontal) {
            this.divide(x, y, w, wallY - y + 1);
            this.divide(x, wallY + 1, w, h - (wallY - y + 1));
        } else {
            this.divide(x, y, wallX - x + 1, h);
            this.divide(wallX + 1, y, w - (wallX - x + 1), h);
        }
    }
}

module.exports = RMDGenerator