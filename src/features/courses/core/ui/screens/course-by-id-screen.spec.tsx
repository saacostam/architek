import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
	type INavigationAdapter,
	RouteName,
} from "@/shared/adapters/navigation/domain";
import { NavigationAdapter } from "@/shared/adapters/navigation/infra";
import { renderWithProviders, TestIdSelector } from "@/shared/tests";
import type { ICourse } from "../../domain";
import { CourseMockFactory } from "../../tests";
import { CourseByIdScreen } from "./course-by-id-screen";

enum Selector {
	CHAPTER_CARD = "chapter-card",
	CHAPTER_SEPARATOR = "chapter-separator",
}

const navigationAdapter = new NavigationAdapter();

function setupTest({
	id,
	courses = [],
}: {
	id: string | undefined;
	courses?: ICourse[];
}) {
	const replace = vi.fn();

	renderWithProviders(<CourseByIdScreen />, {
		adapters: {
			navigationAdapter,
			routerAdapter: {
				useParams: () => ({ id }),
				replace,
			},
		},
		repositories: { coursesRepository: { courses } },
	});

	return { replace };
}

function expectRedirectToHome(replace: ReturnType<typeof vi.fn>) {
	expect(replace).toHaveBeenCalledWith(
		navigationAdapter.generateRoute({ name: RouteName.HOME }),
	);
}

describe("CourseByIdScreen", () => {
	it("should redirect to home if id param is missing", () => {
		const { replace } = setupTest({ id: undefined });
		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should redirect to home if id param is invalid", () => {
		const course = CourseMockFactory.create({ available: true });

		const { replace } = setupTest({
			id: `${course.id}+invalid`,
			courses: [course],
		});

		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should redirect to home if course is not available", () => {
		const course = CourseMockFactory.create({ available: false });

		const { replace } = setupTest({
			id: course.id,
			courses: [course],
		});

		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should render course information", () => {
		const course = CourseMockFactory.create({
			available: true,
			overrides: {
				chapters: [
					{
						title: "chapter-1-title",
						topics: [
							{
								id: "overview-of-load-balancers",
								title: "Overview-of-load-balancers",
							},
						],
					},
				],
			},
		});

		const { replace } = setupTest({
			id: course.id,
			courses: [course],
		});

		const generateRoute = vi.spyOn(navigationAdapter, "generateRoute");

		expect(
			screen.queryByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON),
		).toBeNull();
		expect(replace).not.toHaveBeenCalled();

		expect(screen.getByRole("img").getAttribute("src")).toBe(course.logoUrl);
		expect(screen.getByText(course.title).textContent).toBe(course.title);
		expect(screen.getByText(course.description).textContent).toBe(
			course.description,
		);
		expect(screen.getByText("chapter-1-title")).not.toBeNull();
		expect(screen.getByText("Overview-of-load-balancers")).not.toBeNull();

		const payload: Parameters<INavigationAdapter["generateRoute"]>[0] = {
			name: RouteName.TOPIC_BY_ID,
			payload: {
				courseId: course.id,
				topicId: course.chapters[0].topics[0].id,
			},
		};

		const link = screen.getByRole("link", {
			name: /overview-of-load-balancers/i,
		});
		expect(link.getAttribute("href")).toBe(
			navigationAdapter.generateRoute(payload),
		);
		expect(generateRoute).toHaveBeenCalledWith(payload);
	});

	it("renders correct number of chapters, topics, links, and separators", () => {
		const course = CourseMockFactory.create({
			available: true,
			overrides: {
				chapters: [
					{
						title: "chapter-1",
						topics: [
							{ id: "overview-of-load-balancers", title: "Topic 1" },
							{ id: "overview-of-load-balancers", title: "Topic 2" },
						],
					},
					{
						title: "chapter-2",
						topics: [{ id: "overview-of-load-balancers", title: "Topic 3" }],
					},
				],
			},
		});

		setupTest({
			id: course.id,
			courses: [course],
		});

		expect(screen.getAllByTestId(Selector.CHAPTER_CARD).length).toBe(
			course.chapters.length,
		);

		const expectedTopics = course.chapters.reduce(
			(acc, c) => acc + c.topics.length,
			0,
		);

		expect(screen.getAllByRole("link").length).toBe(expectedTopics);
		expect(screen.getAllByTestId(Selector.CHAPTER_SEPARATOR).length).toBe(
			course.chapters.length,
		);
	});
});
