export function drawCircle(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	r: number,
	color = "white",
) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

export function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number,
	color?: string,
) {
	const halfW = width / 2;
	const halfH = height / 2;

	const left = x - halfW;
	const top = y - halfH;
	const right = x + halfW;
	const bottom = y + halfH;

	ctx.beginPath();
	ctx.moveTo(left + radius, top);

	ctx.lineTo(right - radius, top);
	ctx.quadraticCurveTo(right, top, right, top + radius);

	ctx.lineTo(right, bottom - radius);
	ctx.quadraticCurveTo(right, bottom, right - radius, bottom);

	ctx.lineTo(left + radius, bottom);
	ctx.quadraticCurveTo(left, bottom, left, bottom - radius);

	ctx.lineTo(left, top + radius);
	ctx.quadraticCurveTo(left, top, left + radius, top);

	if (color) ctx.fillStyle = color;
	ctx.fill();
}
