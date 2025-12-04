import { describe, expect, it } from "vitest";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { NavigationAdapter } from "@/shared/adapters/navigation/infra";
import { renderHookWithProviders } from "@/shared/tests";
import type { ICourse } from "../../domain";
import { CourseMockFactory } from "../../tests";
import { useCourses } from "./use-courses";

const navigationAdapter = new NavigationAdapter();

describe("useCourses", () => {
	it("should return available courses first", () => {
		const SEED = [true, false, true, false, true, false];

		const courses: ICourse[] = SEED.map((available) =>
			CourseMockFactory.create({ available }),
		);

		const { result } = renderHookWithProviders(() => useCourses(), {
			repositories: {
				coursesRepository: { courses },
			},
			adapters: { navigationAdapter },
		});

		const countTrue = SEED.filter(Boolean).length;
		const countFalse = SEED.length - countTrue;
		const expectedOrder = [
			...new Array(countTrue).fill(true),
			...new Array(countFalse).fill(false),
		];

		expect(
			result.current.courses.map(({ available }) => available),
		).toStrictEqual(expectedOrder);
	});

	it("should return dummy link if course is not available", () => {
		const unavailable = CourseMockFactory.create({ available: false });

		const { result } = renderHookWithProviders(() => useCourses(), {
			repositories: {
				coursesRepository: { courses: [unavailable] },
			},
			adapters: { navigationAdapter },
		});

		const href = result.current.getHrefToCourse(unavailable);

		expect(href).toBe("#");
	});

	it("should return course link if course is available", () => {
		const available = CourseMockFactory.create({ available: true });

		const { result } = renderHookWithProviders(() => useCourses(), {
			repositories: {
				coursesRepository: { courses: [available] },
			},
			adapters: { navigationAdapter },
		});

		const expectedHref = navigationAdapter.generateRoute({
			name: RouteName.COURSE_BY_ID,
			payload: { id: available.id },
		});

		const href = result.current.getHrefToCourse(available);

		expect(href).toBe(expectedHref);
	});
});
