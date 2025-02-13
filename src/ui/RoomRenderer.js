export class RoomRenderer {
    renderCorridor (canvas, x, y, xTo, yTo) {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#2f0'
        ctx.strokeStyle = '#2f0'
        ctx.lineWidth = 1
        ctx.fillRect(x - 1, y - 1, 3, 3)
        ctx.beginPath()
        ctx.moveTo(x + 0.5, y + 0.5)
        ctx.lineTo(xTo + 0.5, yTo + 0.5)
        ctx.stroke()
        ctx.closePath()
    }
    /**
     *
     * @param room {Room}
     * @param canvas
     */
    render (room, canvas) {
        const w = canvas.width
        const h = canvas.height
        const rxstart = w / 6
        const rystart = h / 6
        const rwidth = canvas.width - rxstart * 2
        const rheight = canvas.height - rystart * 2
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#999'
        ctx.strokeStyle = '#666'
        ctx.lineWidth = canvas.width / 32
        ctx.fillRect(rxstart, rystart, rwidth, rheight)
        ctx.strokeRect(rxstart, rystart, rwidth, rheight)
        const pUp = rystart - 1
        const pDown = h - rystart - 1
        const pLeft = rxstart - 1
        const pRight = w - rystart - 1
        const pw2 = w / 2
        const ph2 = h / 2
        ctx.fillStyle = '#2f0'
        ctx.strokeStyle = '#2f0'
        ctx.lineWidth = 1
        if (room.exits.n) {
            this.renderCorridor(canvas, pw2, pUp, pw2, 0)
        }
        if (room.exits.s) {
            this.renderCorridor(canvas, pw2, pDown, pw2, h - 1)
        }
        if (room.exits.e) {
            this.renderCorridor(canvas, pRight, ph2, w - 1, ph2)
        }
        if (room.exits.w) {
            this.renderCorridor(canvas, pLeft, ph2, 0, ph2)
        }
        if (room.exits.nw) {
            this.renderCorridor(canvas, pLeft, pUp, 0, 0)
        }
        if (room.exits.ne) {
            this.renderCorridor(canvas, pRight, pUp, w - 1, 0)
        }
        if (room.exits.sw) {
            this.renderCorridor(canvas, pLeft, pDown, 0, h - 1)
        }
        if (room.exits.se) {
            this.renderCorridor(canvas, pRight, pDown, w - 1, h - 1)
        }
    }
}