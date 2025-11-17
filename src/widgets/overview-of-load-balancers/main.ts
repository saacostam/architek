import { DomainError, DomainErrorType } from "@/shared/adapters/errors/domain";
import { COLORS } from "../core";
import type { Actor } from "./actor";
import { EntryPoint } from "./entrypoint";
import { Server } from "./server";

export class AirportTerminal {
	private lastExecution = Date.now();
	private ctx: CanvasRenderingContext2D;

	isGameOver = false;
	actors: Actor[] = [];

	constructor(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext("2d");

		if (!ctx)
			throw new DomainError(
				DomainErrorType.CODE_ERROR,
				"Canvas 2D rendering context is not available",
			);

		this.ctx = ctx;

		this.actors.push(
			...[
				new EntryPoint({
					x: this.ctx.canvas.width / 2,
					y: this.ctx.canvas.height * 0.9,
				}),
				new Server({
					x: this.ctx.canvas.width * 0.1,
					y: this.ctx.canvas.height * 0.2,
				}),
				new Server({
					x: this.ctx.canvas.width * 0.9,
					y: this.ctx.canvas.height * 0.2,
				}),
				new Server({
					x: this.ctx.canvas.width * 0.5,
					y: this.ctx.canvas.height * 0.2,
				}),
			],
		);
	}

	draw(delta: number) {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.fillStyle = COLORS.BG;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		this.actors.forEach((actor) => {
			actor.draw(delta, this, this.ctx);
		});
	}

	update(delta: number) {
		this.actors.forEach((actor) => {
			actor.update(delta, this);
		});

		this.actors = this.actors.filter((actor) => actor.isAlive);
	}

	start() {
		const loop = () => {
			const now = Date.now();
			const delta = now - this.lastExecution;

			this.update(delta);
			this.draw(delta);

			if (!this.isGameOver) requestAnimationFrame(loop);

			this.lastExecution = now;
		};

		loop();
	}

	cleanup() {
		this.isGameOver = true;
	}
}
