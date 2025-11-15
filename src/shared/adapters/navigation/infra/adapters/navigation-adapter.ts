import {
	type GenerateRouteAction,
	type INavigationAdapter,
	RouteName,
} from "../../domain";

export class NavigationAdapter implements INavigationAdapter {
	defineRoute(name: RouteName): string {
		switch (name) {
			case RouteName.COURSE_BY_ID: {
				return "/:id";
			}
			case RouteName.HOME: {
				return "/";
			}
		}
	}

	generateRoute(action: GenerateRouteAction): string {
		switch (action.name) {
			case RouteName.COURSE_BY_ID: {
				return `/${action.payload.id}`;
			}
			case RouteName.HOME: {
				return "/";
			}
		}
	}
}
