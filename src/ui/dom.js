/**
 *
 * @param tag {string}
 * @param attributes {{[name: string]: string}}
 * @param text {string}
 * @param parent {HTMLElement}
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, text = "", parent = null) {
    const element = document.createElement(tag);

    // Appliquer les attributs
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });

    // Ajouter le texte si présent
    if (text) {
        element.textContent = text;
    }

    // Ajouter au parent si fourni
    if (parent) {
        parent.appendChild(element);
    }

    return element;
}

/**
 *
 * @param parent {HTMLElement}
 */
export function clearElement(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function generateCanvasGrid (canvas, width, height, cellWidth, cellHeight, fCellDrawing = undefined) {
    // virer précédente structure
    canvas.width = width * cellWidth
    canvas.height = height * cellHeight
    /**
     * @type {HTMLCanvasElement}
     */
    const oOffscreenCanvas = createElement('canvas', {
        width: cellWidth,
        height: cellHeight,
    }, '')
    const oRenderContext = canvas.getContext('2d');
    const ctx = oOffscreenCanvas.getContext('2d')
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            ctx.clearRect(0, 0, oOffscreenCanvas.width, oOffscreenCanvas.height);
            if (fCellDrawing) {
                fCellDrawing(oOffscreenCanvas, x, y)
            }
            oRenderContext.drawImage(oOffscreenCanvas, x * cellWidth, y * cellHeight)
        }
    }
}