class RecursiveMazeGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => ({ walls: new Set(["N", "S", "E", "W", "NE", "NW", "SE", "SW"]) }))
        );
    }

    generate() {
        this.divide(0, 0, this.width, this.height);
    }

    divide(x, y, w, h) {
        if (w <= 2 || h <= 2) return;

        let horizontal = w < h;
        let wallX = x + (horizontal ? 0 : Math.floor(Math.random() * (w - 1)));
        let wallY = y + (horizontal ? Math.floor(Math.random() * (h - 1)) : 0);
        let passage = horizontal ? wallX + Math.floor(Math.random() * w) : wallY + Math.floor(Math.random() * h);

        for (let i = 0; i < (horizontal ? w : h); i++) {
            if (horizontal) {
                if (y + i !== passage) this.grid[y + i][wallX].walls.add("E");
            } else {
                if (x + i !== passage) this.grid[wallY][x + i].walls.add("S");
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

    printMaze() {
        for (let row of this.grid) {
            let line = "";
            for (let cell of row) {
                line += cell.walls.size > 0 ? "# " : ". ";
            }
            console.log(line);
        }
    }
}

const maze = new RecursiveMazeGenerator(10, 10);
maze.generate();
maze.printMaze();
