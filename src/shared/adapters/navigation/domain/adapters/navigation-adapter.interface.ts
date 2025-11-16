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
	  }
	| {
			name: RouteName.TOPIC_BY_ID;
			payload: {
				courseId: string;
				topicId: string;
			};
	  };

export interface INavigationAdapter {
	defineRoute(name: RouteName): string;
	generateRoute(action: GenerateRouteAction): string;
}
