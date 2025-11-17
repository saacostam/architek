import { COLORS, drawCircle } from "../core";
import { Actor } from "./actor";
import type { AirportTerminal } from "./main";
import type { Point } from "./physics";

export class Packet extends Actor {
	public objective: Point;

	public x: number;
	public y: number;

	constructor(args: {
		x: number;
		y: number;
		objective: Point;
	}) {
		super();

		this.objective = args.objective;

		this.x = args.x;
		this.y = args.y;
	}

	draw(_: number, __: AirportTerminal, ctx: CanvasRenderingContext2D): void {
		const SIZE = ctx.canvas.width / 120;

		drawCircle(ctx, this.x, this.y, SIZE, COLORS.ACCENT);
	}

	update(delta: number): void {
		const dirX = this.objective.x - this.x;
		const dirY = this.objective.y - this.y;

		const normalizedVector = Math.sqrt(dirX ** 2 + dirY ** 2);

		const normX = dirX / normalizedVector;
		const normY = dirY / normalizedVector;

		const VEL = 0.8;

		this.x += normX * delta * VEL;
		this.y += normY * delta * VEL;

		const MIN_DISTANCE = 5;
		if (
			MIN_DISTANCE > Math.abs(this.x - this.objective.x) &&
			MIN_DISTANCE > Math.abs(this.y - this.objective.y)
		) {
			this.kill();
		}
	}
}
