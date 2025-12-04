import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { NavigationAdapter } from "@/shared/adapters/navigation/infra";
import { renderWithProviders } from "@/shared/tests";
import type { ICourse } from "../../../domain";
import { CourseMockFactory } from "../../../tests";
import { AllCourses } from "./all-courses";

enum Selectors {
	CONTAINER = "all-courses-container",
}

const navigationAdapter = new NavigationAdapter();

describe("useCourses", () => {
	it("should return available courses first, alphabetically, and keep unavailable order", () => {
		const coursesSeed = [
			{ title: "Zeta", available: true },
			{ title: "Alpha", available: true },
			{ title: "Gamma", available: false },
			{ title: "Delta", available: false },
		];

		const courses: ICourse[] = coursesSeed.map((data) =>
			CourseMockFactory.create(data),
		);

		renderWithProviders(<AllCourses />, {
			repositories: {
				coursesRepository: { courses },
			},
			adapters: { navigationAdapter },
		});

		const container = screen.getByTestId(Selectors.CONTAINER);
		const anchors = Array.from(container.querySelectorAll("a"));

		const expectedOrder = [...courses].sort((a, b) => {
			if (a.available && b.available) return a.title.localeCompare(b.title);

			const aVal = a.available ? 1 : 0;
			const bVal = b.available ? 1 : 0;

			if (aVal !== bVal) return bVal - aVal;
			return 0;
		});

		anchors.forEach((el, index) => {
			const course = expectedOrder[index];
			const href = el.getAttribute("href");

			if (course.available) {
				const expectedHref = navigationAdapter.generateRoute({
					name: RouteName.COURSE_BY_ID,
					payload: { id: course.id },
				});

				expect(href).toBe(expectedHref);
			} else {
				expect(href).not.toMatch(/^\/\d+$/);
			}
		});
	});
});
