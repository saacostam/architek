import type { AirportTerminal } from "./main";

export class Actor {
	public isAlive = true;
	update(delta: number, state: AirportTerminal) {
		delta;
		state;
	}
	draw(delta: number, state: AirportTerminal, ctx: CanvasRenderingContext2D) {
		delta;
		state;
		ctx;
	}
	kill() {
		this.isAlive = false;
	}
}
