import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import type { IRouterAdapter } from "../domain";

export function useReactRouterAdapterImpl(): IRouterAdapter {
	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	const getBaseUrl = useCallback((): string => {
		return window.location.origin;
	}, []);

	const getPathname = useCallback((): string => {
		return location.pathname;
	}, [location.pathname]);

	const getParams = useCallback((): Record<string, string | undefined> => {
		return params;
	}, [params]);

	const getUrlSearchParams = useCallback((): URLSearchParams => {
		return new URLSearchParams(window.location.search);
	}, []);

	const push = useCallback(async (route: string): Promise<void> => {
		navigate(route);
	}, [navigate]);

	const replace = useCallback(async (route: string): Promise<void> => {
		navigate(route, { replace: true });
	}, [navigate]);

	const reset = useCallback(async (): Promise<void> => {
		window.location.href = window.location.origin;
	}, []);

	return useMemo<IRouterAdapter>(
		() => ({
			getBaseUrl,
			getPathname,
			getParams,
			getUrlSearchParams,
			push,
			replace,
			reset,
		}),
		[
			getBaseUrl,
			getPathname,
			getParams,
			getUrlSearchParams,
			push,
			replace,
			reset,
		],
	);
}
