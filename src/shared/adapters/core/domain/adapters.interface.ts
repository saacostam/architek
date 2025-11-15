import type { IErrorLoggerAdapter } from "@/shared/adapters/errors/domain";
import type { INavigationAdapter } from "@/shared/adapters/navigation/domain";
import type { IRouterAdapter } from "@/shared/adapters/router/domain";
import type { IThemeAdapter } from "@/shared/adapters/theme/domain";

export interface IAdapters {
	errorLogger: IErrorLoggerAdapter;
	navigationAdapter: INavigationAdapter;
	routerAdapter: IRouterAdapter;
	themeAdapter: IThemeAdapter;
}
