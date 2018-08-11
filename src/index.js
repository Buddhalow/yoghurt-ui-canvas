import {
    GraphicsContext,
    Font
} from 'yoghurt-ui'

/**
 * Represents a graphics context
 */
export default class CanvasGraphicsContext extends GraphicsContext {
    constructor(yoghurt, canvas) {
        super(yoghurt)
        this.canvas = canvas
        this.canvas.style.position = 'relative'
        this.context2d = canvas.getContext('2d')
        this.context2d.lineWidth = 1

        this.font = new Font('Tahoma', 11, false, false)
        this.matrix = {
            x: 0,
            y: 0
        }
        this.context2d.webkitImageSmoothingEnabled = false  
        this.context2d.translate(0.5, 0.5)
    }
    drawImage(image, x, y, width, height, x2, y2, w2, h2) {
        this.context2d.drawImage(image, this.matrix.x + x, this.matrix.y + y, width, height, x2, y2, w2, h2)
    }   
    load() {
        this.canvas.addEventListener('click', (e) => {
            this.yoghurt.click(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            )
        })
        this.canvas.addEventListener('mousedown', (e) => {
            this.yoghurt.mouseDown(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            )
        })
        this.canvas.addEventListener('mousemove', (e) => {
            this.yoghurt.hover(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            )
        })
        this.canvas.addEventListener('mouseup', (e) => {
            this.yoghurt.mouseUp(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            )
        })
    }
    resetClip() {
        this.context2d.resetClip()
    }
    save() {
        this.context2d.save()
    }
    clip(x, y, width, height) {
        this.context2d.rect(this.matrix.x + x, this.matrix.y + y, width, height)
        this.context2d.clip()
    }
    restore() {
        this.context2d.restore()
    }

    get bounds() {
        return {
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height
        }
    }
    setLineDash(dash) {

        if (dash != null)
        this.context2d.setLineDash(dash)
    }
    setOrigo(x, y) {

        this.matrix.x += x 
        this.matrix.y += y
    }
    /**
     * Translate the matrix
     * @param {int} x 
     * @param {int} y 
     */
    translate(x, y) {
        this.matrix.x += Math.round(x)
        this.matrix.y += Math.round(y)
    }

    setFont(font) {
        this.font = font
        this.context2d.font = this.font.size + 'px ' + this.font.name
    }

    fillText(text, x, y, width=0, height=0) {
        this.context2d.fillText(text, this.matrix.x + (x), this.matrix.y + (y))
    }

    /**
     * Draw a line
     * @param {*} x1 
     * @param {*} y1 
     * @param {*} x2 
     * @param {*} y2 
     */
    drawLine(x1, y1, x2, y2) { 
        this.context2d.beginPath()
        this.context2d.moveTo(this.matrix.x + Math.floor(x1), this.matrix.y + Math.floor(y1))
        this.context2d.lineTo(this.matrix.x + Math.floor(x2), this.matrix.y + Math.floor(y2))
        this.context2d.stroke()
    }

    fillRect(x, y, width, height) {
        this.context2d.fillRect(this.matrix.x + x,this.matrix.y +  y, width, height)
    }
    strokeRect(x, y, width, height) {
        this.context2d.strokeRect(this.matrix.x + x,this.matrix.y +  y, width, height)
    }
    measureText(text) {
        return this.context2d.measureText(text)
    }
    setStrokeStyle(stroke) {
        this.context2d.strokeStyle = stroke
    }
    setFillStyle(fillStyle) {
        this.context2d.fillStyle = fillStyle
    }
    clear(x, y, width, height) {
        this.context2d.clearRect(this.matrix.x + x, this.matrix.y +  y, width, height)
    }
}