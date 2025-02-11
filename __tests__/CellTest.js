const WFC = require('../src/wfc/WFCGenerator')
const Cell = require('../src/wfc/Cell')

describe('get set value', () => {
    it('should return undefined at cell construction', function () {
        const c = new Cell()
        expect(c.value).toBeNull()
    })

    it('should return abc when setting value to abc', function () {
        const c = new Cell()
        c.value = 'abc'
        expect(c.value).toBe('abc')
    })
})

describe('get position', function () {
    it('should return 0, 0, 0 when construct and not initializing coords', function () {
        const c = new Cell()
        expect(c.position).toEqual({ x: 0, y: 0 })
    })
    it('should return 1, 2, 3 when construct cell with 1, 2, 3', function () {
        const c = new Cell(1, 2)
        expect(c.position).toEqual({ x: 1, y: 2 })
    })
})

describe('get possibilities', function () {
    it('should return empty array after construct', function () {
        const c = new Cell()
        expect(c.possibilities).toEqual([])
    })
    it('should return abc after adding possibility abc', function () {
        const c = new Cell()
        c.addPossibility('abc')
        expect(c.possibilities).toEqual(['abc'])
    })
    it('should return abc, def after adding possibility abc, def', function () {
        const c = new Cell()
        c.addPossibility('abc')
        c.addPossibility('def')
        expect(c.possibilities).toEqual(['abc', 'def'])
    })
    it('should keep order, return def, abc after adding possibility def, abc', function () {
        const c = new Cell()
        c.addPossibility('def')
        c.addPossibility('abc')
        expect(c.possibilities).toEqual(['def', 'abc'])
    })
    it('should not duplicate, return abc after adding possibility abc twice', function () {
        const c = new Cell()
        c.addPossibility('abc')
        c.addPossibility('abc')
        expect(c.possibilities).toEqual(['abc'])
    })
})

describe('keepPossibilities', function () {
    it('should keep nothing when passing empty array', function () {
        const c = new Cell()
        c.addPossibility('abc')
        c.addPossibility('def')
        c.addPossibility('ghi')
        expect(c.entropy).toBe(3)
        c.restrictPossibilities([])
        expect(c.entropy).toBe(0)
    })
    it('should keep abc when passing abc', function () {
        const c = new Cell()
        c.addPossibility('abc')
        c.addPossibility('def')
        c.addPossibility('ghi')
        expect(c.entropy).toBe(3)
        c.restrictPossibilities(['abc'])
        expect(c.entropy).toBe(1)
        expect(c.possibilities).toEqual(['abc'])
    })

})

describe('get entropy ; isUnresolved', function () {
    it('should return 4 when adding 4 possibilities', function () {
        const c = new Cell()
        c.addPossibility('abc1')
        c.addPossibility('abc2')
        c.addPossibility('abc3')
        c.addPossibility('abc4')
        expect(c.entropy).toBe(4)
        expect(c.isUnresolved).toBeTruthy()
    })
    it('should return true when adding 1 possibility only', function () {
        const c = new Cell()
        c.addPossibility('abc1')
        expect(c.entropy).toBe(1)
        expect(c.isUnresolved).toBeFalsy()
    })
})

