const WFCGenerator = require('../src/wfc/WFCGenerator')
const Cell = require('../src/wfc/Cell')

describe('WFC.setWorldSize', () => {
    it('should return Cell when asking for room 1, 2', function () {
        const w = new WFCGenerator()
        w.setWorldSize(5, 6)
        expect(w.cells[1][2]).toBeInstanceOf(Cell)
    })
    it('should propagate all possibilities to cells', function () {
        const w = new WFCGenerator()
        w.probabilities = {
            x: 0.5,
            y: 0.5
        }
        w.setWorldSize(2, 2)
        expect(w.getCell(0, 0).possibilities).toEqual(['x', 'y'])
        expect(w.getCell(0, 1).possibilities).toEqual(['x', 'y'])
        expect(w.getCell(1, 0).possibilities).toEqual(['x', 'y'])
        expect(w.getCell(1, 1).possibilities).toEqual(['x', 'y'])
        expect(w.getCell(2, 1)).toBeUndefined()
        expect(w.getCell(1, 2)).toBeUndefined()
        expect(w.getCell(1, 1)).toBeDefined()
        expect(w.getCell(-1, 0)).toBeUndefined()
        expect(w.getCell(1, -1)).toBeUndefined()
        expect(w.getCell(0, 1)).toBeDefined()
    })
})

describe('get set random', () => {
    it('should return 0.5 at least 3 times when setting random to () => 0.5', function () {
        const w = new WFCGenerator()
        w.random = () => 0.5
        expect(w.random()).toBe(0.5)
        expect(w.random()).toBe(0.5)
        expect(w.random()).toBe(0.5)
    })
})

describe('get adjacentCells', () => {
    it('should return adjacent cells', () => {
        const w = new WFCGenerator()
        expect(w.adjacentOffsets).toEqual([
                [
                    -1,
                    -1
                ],
                [
                    -1,
                    0
                ],
                [
                    -1,
                    1
                ],
                [
                    0,
                    -1
                ],
                [
                    0,
                    1
                ],
                [
                    1,
                    -1
                ],
                [
                    1,
                    0
                ],
                [
                    1,
                    1
                ]
        ])
    })
})

describe('get size', () => {
    it('should return x:0, y:0, z:0 when constructing wfc', () => {
        const w = new WFCGenerator()
        expect(w.size).toEqual({ x: 1, y: 1 })
    })
    it('should return x:9, y:8, z:7 when constructing wfc', () => {
        const w = new WFCGenerator()
        w.setWorldSize(9, 8)
        expect(w.size).toEqual({ x: 9, y: 8 })
    })
})

describe('set probabilities', () => {
    describe('should throw an error', () => {
        const w = new WFCGenerator()
        it('when one prob is not a number', function () {
            expect(() => w.probabilities = { x: 'a' }).toThrow()
        })
        it('when one prob is not a specifically NaN', function () {
            expect(() => w.probabilities = { x: NaN }).toThrow()
        })
        it('when one prob is negative', function () {
            expect(() => w.probabilities = { x: -1 }).toThrow()
        })
    })
})
