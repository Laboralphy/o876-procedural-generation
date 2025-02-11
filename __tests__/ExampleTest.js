const WFCGenerator = require('../src/wfc/WFCGenerator')

const data = {
    gpt1: {
        probabilities: {
            "empty": 0.25,
            "guard": 0.2,
            "treasure": 0.2,
            "secret": 0.1,
            "magic": 0.15,
            "rest": 0.15,
            "boss": 0.02
        },
        rules: {
            "empty": ["empty", "guard", "secret", "rest", "magic"],
            "guard": ["empty", "guard", "secret", "treasure", "boss"],
            "treasure": ["guard", "secret"],
            "secret": ["empty", "guard", "treasure"],
            "magic": ["empty", "rest"],
            "rest": ["empty", "magic"],
            "boss": ["guard"]
        }
    },
    basic1: {
        probabilities: {
            'full': 0.5,
            '...': 0.5,
        },
        rules: {
            '...': ['...', 'full'],
            'full': ['full', '...']
        }
    },
    difficulty1: {
        probabilities: {
            'd1': 0.33,
            'd2': 0.33,
            'd3': 0.2,
            'd4': 0.14
        },
        rules: {
            'd1': ['d1', 'd2'],
            'd2': ['d1', 'd2', 'd3'],
            'd3': ['d2', 'd3', 'd4'],
            'd4': ['d3', 'd4'],
        }
    },
    difficulty2: {
        probabilities: {
            'd1.': 0.2,
            'd2.': 0.2,
            'd2m': 0.2,
            'd3.': 0.2,
            'd4.': 0.1,
            'd5.': 0
        },
        rules: {
            'd1.': ['d1.', 'd2.', 'd2m'],
            'd2.': ['d1.', 'd2.', 'd3.'],
            'd2m': ['d2m', 'd3.'],
            'd3.': ['d2.', 'd3.', 'd4.'],
            'd4.': ['d3.', 'd4.'],
            'd5.': ['d4.']
        }
    },
    cave1: {
        probabilities: {
            'rock': 0.5,
            '...': 0.5,
            'dummy': 0
        },
        rules: {
            'rock': ['rock', '...'],
            '...': ['...']
        }
    }
}

describe('Produce dungeon', () => {
    it('should generate a 10x10 map when applying these rules', () => {
        const w = new WFCGenerator({
            size: [9, 9],
            ...data.gpt1
        })
        w.determineCell(w.getCell(0, 0), 'treasure')
        w.run()
        const a = Array(10).fill(null).map(() => Array(10).fill('   '))
        const stat = {}
        w.forEachCell(cell => {
            stat[cell.value] = (stat[cell.value] ?? 0) + 1
            a[cell.position.y][cell.position.x] = cell.value ? cell.value.substring(0, 3) : '...'
        })
        console.log(a.map(row => row.join(' ')).join('\n'))
        console.log(stat)
    })
})