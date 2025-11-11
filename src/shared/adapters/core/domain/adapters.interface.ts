import type { IRouterAdapter } from "@/shared/adapters/router/domain";
import type { INavigationAdapter } from "@/shared/adapters/navigation/domain";
import type { IErrorLoggerAdapter } from "@/shared/adapters/errors/domain";

export interface IAdapters {
    errorLogger: IErrorLoggerAdapter;
    navigationAdapter: INavigationAdapter;
    routerAdapter: IRouterAdapter;
}
