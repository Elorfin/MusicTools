export abstract class CanvasDraw {
    /**
     * Current canvas
     * @type {HTMLCanvasElement}
     */
    protected canvas: HTMLCanvasElement;

    /**
     * Context to draw on
     * @type {CanvasRenderingContext2D}
     */
    protected context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        // Extract context from canvas
        this.context = this.canvas.getContext('2d');
    }

    public abstract draw(): void;

    /**
     * Creates even position to avoid blur effect on lines.
     *
     * @param   {number} pos
     * @returns {number}
     */
    protected fixPosition(pos: number): number {
        var pos = Math.round(pos);
        if (0 === pos % 2) {
            pos += 1;
        }

        return pos;
    }

    /**
     * Set shadow option for context
     *
     * @param {number} offsetX
     * @param {number} offsetY
     * @param {number} blur
     * @param {string} color
     */
    protected setContextShadow(offsetX: number, offsetY: number, blur: number, color: string) {
        this.context.shadowOffsetX = offsetX;
        this.context.shadowOffsetY = offsetY;
        this.context.shadowBlur    = blur;
        this.context.shadowColor   = color;
    }

    protected fillContext(color: string|CanvasGradient) {
        this.context.fillStyle = color;
        this.context.fill();
    }

    protected strokeContext(color: string|CanvasGradient, lineWidth: number) {
        this.context.strokeStyle = color;
        this.context.lineWidth   = lineWidth;
        this.context.stroke();
    }
}