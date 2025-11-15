import type { RouteName } from "../entities";

export type GenerateRouteAction =
	| {
			name: RouteName.HOME;
	  }
	| {
			name: RouteName.COURSE_BY_ID;
			payload: {
				id: string;
			};
	  };

export interface INavigationAdapter {
	defineRoute(name: RouteName): string;
	generateRoute(action: GenerateRouteAction): string;
}
