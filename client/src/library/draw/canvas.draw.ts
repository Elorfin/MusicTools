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
        this.context = this.canvas.getContext('2d')
    }

    public abstract draw(): void;

    protected fixPosition(pos: number): number {
        var pos = Math.round(pos);
        if (0 === pos % 2) {
            pos += 1;
        }

        return pos;
    }
}