import type { RouteName } from "../entities";

export type GenerateRouteAction =
	| {
			name: RouteName.HOME;
	  }

export interface INavigationAdapter {
	defineRoute(name: RouteName): string;
	generateRoute(action: GenerateRouteAction): string;
}
