import { useCallback, useMemo } from "react";
import type { IErrorLoggerAdapter } from "../../domain";

export function useMockErrorLoggerAdapter(): IErrorLoggerAdapter {
	const log: IErrorLoggerAdapter["log"] = useCallback(async () => {
		// do nothing
	}, []);

	const logAny: IErrorLoggerAdapter["logAny"] = useCallback(async () => {
		// do nothing
	}, []);

	return useMemo(
		() => ({
			log,
			logAny,
		}),
		[log, logAny],
	);
}
