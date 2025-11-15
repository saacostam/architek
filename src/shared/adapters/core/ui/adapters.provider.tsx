import { useMemo, type PropsWithChildren } from "react";
import { HashRouter } from "react-router";
import type { IErrorLoggerAdapter } from "@/shared/adapters/errors/domain";
import { MockErrorLoggerAdapter } from "@/shared/adapters/errors/infra";
import type { INavigationAdapter } from "@/shared/adapters/navigation/domain";
import { NavigationAdapter } from "@/shared/adapters/navigation/infra";
import type { IRouterAdapter } from "@/shared/adapters/router/domain";
import { useReactRouterAdapterImpl } from "@/shared/adapters/router/infra";
import { NavigationProvider } from "@/shared/adapters/navigation/ui";
import type { IThemeAdapter } from "@/shared/adapters/theme/domain";
import { useThemeAdapterImpl } from "@/shared/adapters/theme/infra";
import { AdaptersContext } from "../app";
import type { IAdapters } from "../domain";

export function AdaptersProvider() {
    return <AdaptersWrapper>
        <AdaptersDependencyInjectionContainer>
            <NavigationProvider />
        </AdaptersDependencyInjectionContainer>
    </AdaptersWrapper>
}

function AdaptersWrapper({children}: PropsWithChildren) {
    return <HashRouter>
        {children}
    </HashRouter>;
}

function AdaptersDependencyInjectionContainer({children}: PropsWithChildren) {
    const errorLogger: IErrorLoggerAdapter = useMemo(() => new MockErrorLoggerAdapter(), []);
    const navigationAdapter: INavigationAdapter = useMemo(()=> (new NavigationAdapter()), [] )
    const routerAdapter: IRouterAdapter = useReactRouterAdapterImpl();
    const themeAdapter: IThemeAdapter = useThemeAdapterImpl();
    
    const adapters: IAdapters = useMemo(() => ({
        errorLogger,
        navigationAdapter,
        routerAdapter,
        themeAdapter,
    }), [
        errorLogger,
        navigationAdapter, 
        routerAdapter,
        themeAdapter,
    ])

    return <AdaptersContext.Provider value={adapters}>
        {children}
    </AdaptersContext.Provider>
}
