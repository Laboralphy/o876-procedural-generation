export class RoomRenderer {
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
        const pw2 = w / 2 - 1
        const ph2 = h / 2 - 1
        ctx.fillStyle = '#2f0'
        ctx.strokeStyle = '#2f0'
        ctx.lineWidth = 1
        if (room.exits.n) {
            ctx.fillRect(pw2, pUp, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pw2 + 1, pUp + 1)
            ctx.lineTo(pw2, 0)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.s) {
            ctx.fillRect(pw2, pDown, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pw2, pDown)
            ctx.lineTo(pw2, h - 1)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.e) {
            ctx.fillRect(pRight, ph2, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pRight, ph2)
            ctx.lineTo(w - 1, ph2)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.w) {
            ctx.fillRect(pLeft, ph2, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pLeft, ph2)
            ctx.lineTo(0, ph2)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.nw) {
            ctx.fillRect(pLeft, pUp, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pLeft, pUp)
            ctx.lineTo(0, 0)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.ne) {
            ctx.fillRect(pRight, pUp, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pRight, pUp)
            ctx.lineTo(w - 1, 0)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.sw) {
            ctx.fillRect(pLeft, pDown, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pLeft, pDown)
            ctx.lineTo(0, h - 1)
            ctx.stroke()
            ctx.closePath()
        }
        if (room.exits.se) {
            ctx.fillRect(pRight, pDown, 3, 3)
            ctx.beginPath()
            ctx.moveTo(pRight, pDown)
            ctx.lineTo(w - 1, h - 1)
            ctx.stroke()
            ctx.closePath()
        }
    }
}