import { Rainbow } from '../rainbow/Rainbow.js'

export class RoomRenderer {
    constructor() {
        this.maxDistance = 0
        this.palette = null
        this.dimmerPalette = null
    }

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
        if (this.palette === null) {
            this.palette = Rainbow
                .spectrum('#23f', '#a1f', this.maxDistance + 1)
                .map(color => Rainbow.rgba(color))
            this.dimmerPalette = this.palette.map(s => Rainbow.brightness(s, 0.5).rgba())
        }
        const w = canvas.width
        const h = canvas.height
        const rxstart = w / 6
        const rystart = h / 6
        const rwidth = canvas.width - rxstart * 2
        const rheight = canvas.height - rystart * 2
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = this.palette[room.distance]
        ctx.strokeStyle = this.dimmerPalette[room.distance]
        ctx.lineWidth = canvas.width / 32
        ctx.fillRect(rxstart, rystart, rwidth, rheight)
        ctx.strokeRect(rxstart, rystart, rwidth, rheight)
        if (room.distance === 0 || room.distance === this.maxDistance) {
            ctx.save()
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 3
            ctx.strokeRect(rxstart * 2, rystart * 2, rwidth - rxstart * 2, rheight - rystart * 2)
            ctx.restore()
        }
        if (room.deadEnd) {
            ctx.save()
            ctx.strokeStyle = '#f88'
            ctx.lineWidth = 2
            ctx.strokeRect(rxstart, rystart, rwidth, rheight)
            ctx.restore()
        }
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