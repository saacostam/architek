import { COLORS, drawRoundedRect } from "../core";
import { Actor } from "./actor";
import type { AirportTerminal } from "./main";

export class Server extends Actor {
    public x: number;
    public y: number;
    
    constructor(args: {
        x: number;
        y: number;
    }) {
        super();

        this.x = args.x;
        this.y = args.y;
    }

    draw(_: number, __: AirportTerminal, ctx: CanvasRenderingContext2D): void {
        const SIZE = ctx.canvas.width / 15;

        drawRoundedRect(ctx, this.x, this.y, SIZE, SIZE, SIZE / 8, COLORS.CONTRAST);
    }
}
