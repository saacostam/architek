import { describe, expect, it } from "vitest";
import { NavigationAdapter } from "@/shared/adapters/navigation/infra";
import { renderHookWithProviders } from "@/shared/tests";
import type { ICourse } from "../../domain";
import { CourseMockFactory } from "../../tests";
import { useCourses } from "./use-courses";

const navigationAdapter = new NavigationAdapter();

describe("useCourses", () => {
	it("should return available courses first", () => {
		const SEED = [true, false, true, false, true, false];

		const courses: ICourse[] = SEED.map((testCase) => {
			return CourseMockFactory.create({
				available: testCase,
			});
		});

		const { result } = renderHookWithProviders(() => useCourses(), {
			repositories: {
				coursesRepository: {
					courses: courses,
				},
			},
			adapters: {
				navigationAdapter,
			},
		});

		expect(
			result.current.courses.map(({ available }) => available),
		).toStrictEqual([true, true, true, false, false, false]);
	});

	it("should return dummy link if course is not available", () => {
		const unavailableCourse = CourseMockFactory.create({
			available: false,
		});

		const { result } = renderHookWithProviders(() => useCourses(), {
			repositories: {
				coursesRepository: {
					courses: [unavailableCourse],
				},
			},
			adapters: {
				navigationAdapter,
			},
		});

		const href = result.current.getHrefToCourse(unavailableCourse);
		expect(href).toBe("#");
	});

	it("should return course link if course is available", () => {
		const available = CourseMockFactory.create({
			available: true,
		});

		const { result } = renderHookWithProviders(() => useCourses(), {
			repositories: {
				coursesRepository: {
					courses: [available],
				},
			},
			adapters: {
				navigationAdapter,
			},
		});

		const href = result.current.getHrefToCourse(available);
		expect(href).toBe(`/${available.id}`);
	});
});
