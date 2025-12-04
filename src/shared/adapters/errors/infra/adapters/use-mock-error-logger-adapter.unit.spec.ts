import { describe, expect, it } from "vitest";
import { renderHookWithProviders } from "@/shared/tests";
import { useMockErrorLoggerAdapter } from "./use-mock-error-logger-adapter";

describe("useMockErrorLoggerAdapter", () => {
	it("should return correct methods", () => {
		const { result } = renderHookWithProviders(() =>
			useMockErrorLoggerAdapter(),
		);

		expect(result.current.log).toBeDefined();
		expect(result.current.logAny).toBeDefined();
	});
});
