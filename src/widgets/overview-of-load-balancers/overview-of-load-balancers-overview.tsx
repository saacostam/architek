import { useEffect, useRef } from "react";
import { AirportTerminal } from "./main";

export function OverviewOfLoadBalancersWidget() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (ref.current) {
			const game = new AirportTerminal(ref.current);

			game.start();

			return () => game.cleanup();
		}
	}, []);

	return (
		<canvas
			ref={ref}
			width={2048}
			height={1024}
			style={{
				margin: "auto",
				width: "100%",
				maxWidth: "1024px",
				display: "block",
			}}
		/>
	);
}
