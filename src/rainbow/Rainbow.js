/**
 * @class O876.Rainbow
 * Rainbow - Color Code Convertor Boîte à outil graphique
 * O876 raycaster project
 * 2012-01-01 Raphaël Marandet
 * good to GIT
 */

const COLORS = {
    aliceblue : '#F0F8FF',
    antiquewhite : '#FAEBD7',
    aqua : '#00FFFF',
    aquamarine : '#7FFFD4',
    azure : '#F0FFFF',
    beige : '#F5F5DC',
    bisque : '#FFE4C4',
    black : '#000000',
    blanchedalmond : '#FFEBCD',
    blue : '#0000FF',
    blueviolet : '#8A2BE2',
    brown : '#A52A2A',
    burlywood : '#DEB887',
    cadetblue : '#5F9EA0',
    chartreuse : '#7FFF00',
    chocolate : '#D2691E',
    coral : '#FF7F50',
    cornflowerblue : '#6495ED',
    cornsilk : '#FFF8DC',
    crimson : '#DC143C',
    cyan : '#00FFFF',
    darkblue : '#00008B',
    darkcyan : '#008B8B',
    darkgoldenrod : '#B8860B',
    darkgray : '#A9A9A9',
    darkgrey : '#A9A9A9',
    darkgreen : '#006400',
    darkkhaki : '#BDB76B',
    darkmagenta : '#8B008B',
    darkolivegreen : '#556B2F',
    darkorange : '#FF8C00',
    darkorchid : '#9932CC',
    darkred : '#8B0000',
    darksalmon : '#E9967A',
    darkseagreen : '#8FBC8F',
    darkslateblue : '#483D8B',
    darkslategray : '#2F4F4F',
    darkslategrey : '#2F4F4F',
    darkturquoise : '#00CED1',
    darkviolet : '#9400D3',
    deeppink : '#FF1493',
    deepskyblue : '#00BFFF',
    dimgray : '#696969',
    dimgrey : '#696969',
    dodgerblue : '#1E90FF',
    firebrick : '#B22222',
    floralwhite : '#FFFAF0',
    forestgreen : '#228B22',
    fuchsia : '#FF00FF',
    gainsboro : '#DCDCDC',
    ghostwhite : '#F8F8FF',
    gold : '#FFD700',
    goldenrod : '#DAA520',
    gray : '#808080',
    grey : '#808080',
    green : '#008000',
    greenyellow : '#ADFF2F',
    honeydew : '#F0FFF0',
    hotpink : '#FF69B4',
    indianred  : '#CD5C5C',
    indigo  : '#4B0082',
    ivory : '#FFFFF0',
    khaki : '#F0E68C',
    lavender : '#E6E6FA',
    lavenderblush : '#FFF0F5',
    lawngreen : '#7CFC00',
    lemonchiffon : '#FFFACD',
    lightblue : '#ADD8E6',
    lightcoral : '#F08080',
    lightcyan : '#E0FFFF',
    lightgoldenrodyellow : '#FAFAD2',
    lightgray : '#D3D3D3',
    lightgrey : '#D3D3D3',
    lightgreen : '#90EE90',
    lightpink : '#FFB6C1',
    lightsalmon : '#FFA07A',
    lightseagreen : '#20B2AA',
    lightskyblue : '#87CEFA',
    lightslategray : '#778899',
    lightslategrey : '#778899',
    lightsteelblue : '#B0C4DE',
    lightyellow : '#FFFFE0',
    lime : '#00FF00',
    limegreen : '#32CD32',
    linen : '#FAF0E6',
    magenta : '#FF00FF',
    maroon : '#800000',
    mediumaquamarine : '#66CDAA',
    mediumblue : '#0000CD',
    mediumorchid : '#BA55D3',
    mediumpurple : '#9370DB',
    mediumseagreen : '#3CB371',
    mediumslateblue : '#7B68EE',
    mediumspringgreen : '#00FA9A',
    mediumturquoise : '#48D1CC',
    mediumvioletred : '#C71585',
    midnightblue : '#191970',
    mintcream : '#F5FFFA',
    mistyrose : '#FFE4E1',
    moccasin : '#FFE4B5',
    navajowhite : '#FFDEAD',
    navy : '#000080',
    oldlace : '#FDF5E6',
    olive : '#808000',
    olivedrab : '#6B8E23',
    orange : '#FFA500',
    orangered : '#FF4500',
    orchid : '#DA70D6',
    palegoldenrod : '#EEE8AA',
    palegreen : '#98FB98',
    paleturquoise : '#AFEEEE',
    palevioletred : '#DB7093',
    papayawhip : '#FFEFD5',
    peachpuff : '#FFDAB9',
    peru : '#CD853F',
    pink : '#FFC0CB',
    plum : '#DDA0DD',
    powderblue : '#B0E0E6',
    purple : '#800080',
    rebeccapurple : '#663399',
    red : '#FF0000',
    rosybrown : '#BC8F8F',
    royalblue : '#4169E1',
    saddlebrown : '#8B4513',
    salmon : '#FA8072',
    sandybrown : '#F4A460',
    seagreen : '#2E8B57',
    seashell : '#FFF5EE',
    sienna : '#A0522D',
    silver : '#C0C0C0',
    skyblue : '#87CEEB',
    slateblue : '#6A5ACD',
    slategray : '#708090',
    slategrey : '#708090',
    snow : '#FFFAFA',
    springgreen : '#00FF7F',
    steelblue : '#4682B4',
    tan : '#D2B48C',
    teal : '#008080',
    thistle : '#D8BFD8',
    tomato : '#FF6347',
    turquoise : '#40E0D0',
    violet : '#EE82EE',
    wheat : '#F5DEB3',
    white : '#FFFFFF',
    whitesmoke : '#F5F5F5',
    yellow : '#FFFF00',
    yellowgreen : '#9ACD32'
};

export class Color {
    constructor({ r, b, g, a = 255 }) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    hex (n = 6) {
        switch (n) {
            case 3: {
                return Rainbow.buildString3FromStructure(this)
            }
            case 6: {
                return Rainbow.buildString6FromStructure(this)
            }
            case 8: {
                return Rainbow.buildString8FromStructure(this)
            }
        }
    }

    rgba () {
        return Rainbow.buildRGBAFromStructure(this)
    }

    rgb () {
        return Rainbow.buildRGBFromStructure(this)
    }

    hsl () {
        return Rainbow.buildHSLFromStructure(this)
    }

    hsla () {
        return Rainbow.buildHSLAFromStructure(this)
    }
}



const REGEXP_RGB = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
const REGEXP_RGBA = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+(?:\.\d+)?)\s*\)$/
const REGEXP_HSL = /^hsl\(\s*(\d+(?:\.\d+)?)(deg|rad|)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/
const REGEXP_HSLA = /^hsl\(\s*(\d+(?:\.\d+)?)(deg|rad|)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)\s*\)$/

/**
 * @typedef RGBAStruct {object}
 * @property r {number}
 * @property g {number}
 * @property b {number}
 * @property a {number}
 *
 * @typedef AnyColor {RGBAStruct|number|string}
 */

export class Rainbow {

    /**
     * Fabrique une chaine de caractère représentant une couleur au format CSS
     * @param xData une structure {r: int, g: int, b: int, a: float}
     * @return code couleur CSS au format rgb(r, g, b) ou rgba(r, g, b, a)
     */
    static rgba(xData) {
        return Rainbow.buildRGBAFromStructure(Rainbow.parse(xData));
    }

    /**
     * @author https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/js/s/rgb-to-hsl.md
     * @param r
     * @param g
     * @param b
     * @returns {{h: number, s: number: l: number}}
     */
    static convertRGBToHSL (r, g, b) {
        r /= 255
        g /= 255
        b /= 255
        const l = Math.max(r, g, b)
        const s = l - Math.min(r, g, b)
        const h = s
            ? l === r
                ? (g - b) / s
                : l === g
                    ? 2 + (b - r) / s
                    : 4 + (r - g) / s
            : 0
        return {
            h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
            s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
            l: (100 * (2 * l - s)) / 2
        }
    }

    static convertHSLToRGB (h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return {
            r: Math.floor(255 * f(0)),
            g: Math.floor(255 * f(8)),
            b: Math.floor(255 * f(4))
        }
    }

    /**
     * Transforme une couleur en entier 32bits
     * @param xData
     * @returns {number}
     */
    static int32(xData) {
        const x = Rainbow.parse(xData);
        return x.r | (x.g << 8) | (x.b << 16) | (x.a << 24);
    }

    /**
     * Analyse une valeur d'entrée pour construire une structure avec les
     * composantes "r", "g", "b", et eventuellement "a".
     * @param xData {AnyColor}
     * @return {Color}
     */
    static parse(xData) {
        if (typeof xData === "object") {
            return xData instanceof Color ? xData : new Color(xData);
        } else if (typeof xData === "number") {
            return Rainbow.buildStructureFromInt(xData);
        } else if (typeof xData === "string") {
            xData = xData.toLowerCase();
            if (xData in COLORS) {
                xData = COLORS[xData];
            }
            switch (xData.length) {
                case 3:
                    return Rainbow.buildStructureFromString3(xData);

                case 4:
                    if (xData[0] === '#') {
                        return Rainbow.buildStructureFromString3(xData.substr(1));
                    } else {
                        throw new Error('invalid color structure');
                    }

                case 6:
                    return Rainbow.buildStructureFromString6(xData);

                case 7:
                    if (xData[0] === '#') {
                        return Rainbow.buildStructureFromString6(xData.substr(1));
                    } else {
                        throw new Error('invalid color structure');
                    }

                default:
                    let rx = xData.match(REGEXP_RGB);
                    if (rx) {
                        return new Color({r: rx[1] | 0, g: rx[2] | 0, b: rx[3] | 0, a: 255});
                    }
                    rx = xData.match(REGEXP_RGBA)
                    if (rx) {
                        return new Color({
                            r: parseFloat(rx[1]),
                            g: parseFloat(rx[2]),
                            b: parseFloat(rx[3]),
                            a: Math.floor(255 * parseFloat(rx[4]))
                        });
                    }
                    rx = xData.match(REGEXP_HSL)
                    if (rx) {
                        return new Color(Rainbow.convertHSLToRGB(
                            parseFloat(rx[1]),
                            parseFloat(rx[3]),
                            parseFloat(rx[4])
                        ))
                    }
                    throw new Error('invalid color structure ' + xData);
            }
        }
        throw new Error('could not parse this thing : ' + JSON.stringify(xData));
    }

    /**
     * Transforme un code couleur 32bits en structure rgba
     * @param n {number}
     * @returns {Color}
     */
    static buildStructureFromInt(n) {
        let a = (n >> 24) & 0xFF;
        let b = (n >> 16) & 0xFF;
        let g = (n >> 8) & 0xFF;
        let r = n & 0xFF;
        return new Color({r, g, b, a});
    }

    /**
     * Transforme un code couleur en string (repr. CSS) en structure rgba
     * @param s {string}
     * @returns {Color}
     */
    static buildStructureFromString3(s) {
        let r = parseInt('0x' + s[0] + s[0]);
        let g = parseInt('0x' + s[1] + s[1]);
        let b = parseInt('0x' + s[2] + s[2]);
        let a = 255;
        return new Color({r, g, b, a});
    }

    /**
     * Transforme un code couleur en string (repr. CSS) en structure rgba
     * @param s {string}
     * @returns {Color}
     */
    static buildStructureFromString6(s) {
        let r = parseInt('0x' + s[0] + s[1]);
        let g = parseInt('0x' + s[2] + s[3]);
        let b = parseInt('0x' + s[4] + s[5]);
        let a = 255;
        return new Color({r, g, b, a});
    }

    /**
     * Convert a {r, g, b, a} structure into a css string
     * @param oData {{r: number, g: number, b: number, a: number}}
     * @returns {string}
     */
    static buildRGBAFromStructure(oData) {
        let s1 = 'rgb';
        let s2 = oData.r.toString() + ', ' + oData.g.toString() + ', ' + oData.b.toString();
        if ('a' in oData) {
            s1 += 'a';
            s2 += ', ' + (oData.a / 255).toString();
        }
        return s1 + '(' + s2 + ')';
    }
    static buildRGBFromStructure(oData) {
        let s1 = 'rgb';
        let s2 = oData.r.toString() + ', ' + oData.g.toString() + ', ' + oData.b.toString();
        return s1 + '(' + s2 + ')';
    }

    /**
     * Convert a {r, g, b, a} structure into a css string
     * @param oData {{r: number, g: number, b: number, a: number}}
     * @returns {string}
     */
    static buildString3FromStructure(oData) {
        let sr = ((oData.r >> 4) & 0xF).toString(16);
        let sg = ((oData.g >> 4) & 0xF).toString(16);
        let sb = ((oData.b >> 4) & 0xF).toString(16);
        return '#' + sr + sg + sb;
    }

    /**
     * Convert a {r, g, b, a} structure into a css string
     * @param oData {{r: number, g: number, b: number, a: number}}
     * @returns {string}
     */
    static buildString6FromStructure(oData) {
        let sr = (oData.r & 0xFF).toString(16).padStart(2, '0');
        let sg = (oData.g & 0xFF).toString(16).padStart(2, '0');
        let sb = (oData.b & 0xFF).toString(16).padStart(2, '0');
        return '#' + sr + sg + sb;
    }

    /**
     * Convert a {r, g, b, a} structure into a css string
     * @param oData {{r: number, g: number, b: number, a: number}}
     * @returns {string}
     */
    static buildString8FromStructure(oData) {
        let sr = (oData.r & 0xFF).toString(16).padStart(2, '0');
        let sg = (oData.g & 0xFF).toString(16).padStart(2, '0');
        let sb = (oData.b & 0xFF).toString(16).padStart(2, '0');
        let sa = (oData.a & 0xFF).toString(16).padStart(2, '0');
        return '#' + sr + sg + sb + sa;
    }

    static buildHSLFromStructure(color) {
        const { h, s, l } = Rainbow.convertRGBToHSL(color.r, color.g, color.b)
        return `hsl(${h}deg, ${s}%, ${l}%)`
    }

    static buildHSLAFromStructure(color) {
        const { h, s, l } = Rainbow.convertRGBToHSL(color.r, color.g, color.b)
        const a = color.a / 255
        return `hsla(${h}deg, ${s}%, ${l}%, ${a})`
    }

    /**
     * Clamps a value between 0 and 255
     * @param n {number}
     * @returns {number}
     */
    static byte(n) {
        return Math.min(255, Math.max(0, n | 0));
    }

    /**
     * Adjust brightness of input color
     * @param color {AnyColor}
     * @param f {number} brightness factor
     * @returns {Color}
     */
    static brightness(color, f) {
        let c = Rainbow.parse(color);
        c.r = Rainbow.byte(f * c.r);
        c.g = Rainbow.byte(f * c.g);
        c.b = Rainbow.byte(f * c.b);
        return new Color(c);
    }

    /**
     * Turns a color into grayscale
     * @param color {AnyColor}
     * @returns {Color}
     */
    static grayscale(color) {
        let c = Rainbow.parse(color);
        let n = Math.round((c.r * 30 + c.g * 59 + c.b * 11) / 100);
        c.r = c.g = c.b = n;
        return new Color(c);
    }

    /**
     * Génère un spectre entre deux valeurs de couleurs
     * @param sColor1 {AnyColor}
     * @param sColor2 {AnyColor}
     * @param nSteps {number}
     * @return {RGBAStruct[]}
     */
    static spectrum(sColor1, sColor2, nSteps) {
        let c1 = Rainbow.parse(sColor1);
        let c2 = Rainbow.parse(sColor2);

        function getMedian(x1, x2) {
            if (x1 === undefined) {
                throw new Error('first color is undefined');
            }
            if (x2 === undefined) {
                throw new Error('second color is undefined');
            }
            return {
                r: (x1.r + x2.r) >> 1,
                g: (x1.g + x2.g) >> 1,
                b: (x1.b + x2.b) >> 1,
                a: (x1.a + x2.a) >> 1,
            };
        }

        function fillArray(a, x1, x2, n1, n2) {
            let m = getMedian(x1, x2);
            let n = (n1 + n2) >> 1;
            if (Math.abs(n1 - n2) > 1) {
                fillArray(a, x1, m, n1, n);
                fillArray(a, m, x2, n, n2);
            }
            a[n1] = x1;
            a[n2] = x2;
            return a;
        }

        return fillArray([], c1, c2, 0, nSteps - 1).map(function(c) {
            return Rainbow.parse(c);
        }, this);
    }

    /**
     * Generate a gradient
     * @param oPalette {object} palette definition
     * @return {RGBAStruct[]}
     *
     * {
     * 		start: value,
     * 		stop1: value,
     * 		stop2: value,
     * 		...
     * 		stopN: value,
     * 		end: value
     * },
     *
     * example :
     * {
     * 		0: '#00F',
     * 		50: '#FF0',
     * 		100: '#F00'
     * }
     * rappel : une palette d'indices de 0 à 100 dispose de 101 entrée
     */
    static gradient(oPalette) {
        let aPalette = [];
        let sColor;
        let sLastColor = null;
        let nPal;
        let nLastPal = 0;
        for (let iPal in oPalette) {
            nPal = iPal | 0;
            sColor = oPalette[iPal];
            if (sLastColor !== null) {
                aPalette = aPalette.concat(Rainbow.spectrum(sLastColor, sColor, nPal - nLastPal + 1).slice(1));
            } else {
                aPalette[nPal] = Rainbow.parse(sColor);
            }
            sLastColor = sColor;
            nLastPal = nPal;
        }
        return aPalette;
    }
}
