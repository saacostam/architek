import {
	type GenerateRouteAction,
	type INavigationAdapter,
	RouteName,
} from "../../domain";

export class NavigationAdapter implements INavigationAdapter {
	defineRoute(name: RouteName): string {
		switch (name) {
			case RouteName.HOME: {
				return "/";
			}
		}
	}

	generateRoute(action: GenerateRouteAction): string {
		switch (action.name) {
			case RouteName.HOME: {
				return "/";
			}
		}
	}
}
