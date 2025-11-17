import { COLORS, drawCircle } from "../core";
import { Actor } from "./actor";
import type { AirportTerminal } from "./main";
import { Packet } from "./packet";
import type { Point } from "./physics";
import { Server } from "./server";

const OFFSETS: Point[] = [
	{
		x: 0,
		y: 0,
	},
	{
		x: 1,
		y: -1,
	},
	{
		x: -1,
		y: -1,
	},
	{
		x: 2,
		y: 0,
	},
	{
		x: -2,
		y: 0,
	},
	{
		x: 1,
		y: 1,
	},
	{
		x: -1,
		y: 1,
	},
];

export class EntryPoint extends Actor {
	public static TIMEOUT = 200;
	public timeout = EntryPoint.TIMEOUT;

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

	update(delta: number, state: AirportTerminal): void {
		this.timeout += delta;

		if (this.timeout > EntryPoint.TIMEOUT) {
			this.timeout = 0;

			const servers = state.actors.filter((actor) => actor instanceof Server);
			const randServer = servers.at(Math.floor(servers.length * Math.random()));

			if (randServer) {
				state.actors.push(
					new Packet({
						x: this.x,
						y: this.y,
						objective: {
							x: randServer.x,
							y: randServer.y,
						},
					}),
				);
			}

		}
	}

	draw(_: number, __: AirportTerminal, ctx: CanvasRenderingContext2D): void {
		const SIZE = ctx.canvas.width / 70;

		for (const offset of OFFSETS) {
			drawCircle(
				ctx,
				this.x + offset.x * SIZE,
				this.y + offset.y * SIZE,
				SIZE,
				COLORS.CONTRAST,
			);
		}
	}
}
