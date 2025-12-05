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

describe("CourseByIdScreen", () => {
	it("should redirect to home if id param is missing", () => {
		const replace = vi.fn();

		renderWithProviders(<CourseByIdScreen />, {
			adapters: {
				navigationAdapter,
				routerAdapter: {
					useParams: () => ({
						id: undefined,
					}),
					replace,
				},
			},
			repositories: {
				coursesRepository: {
					courses: [],
				},
			},
		});

		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expect(replace).toHaveBeenCalledWith(
			navigationAdapter.generateRoute({
				name: RouteName.HOME,
			}),
		);
	});

	it("should redirect to home if id param is not a valid course id", () => {
		const course = CourseMockFactory.create({ available: true });

		const replace = vi.fn();

		renderWithProviders(<CourseByIdScreen />, {
			adapters: {
				navigationAdapter,
				routerAdapter: {
					useParams: () => ({
						id: `${course.id}+smt-diff`,
					}),
					replace,
				},
			},
			repositories: {
				coursesRepository: {
					courses: [course],
				},
			},
		});

		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expect(replace).toHaveBeenCalledWith(
			navigationAdapter.generateRoute({
				name: RouteName.HOME,
			}),
		);
	});

	it("should redirect to home if course is not valid", () => {
		const course = CourseMockFactory.create({ available: false });

		const replace = vi.fn();

		renderWithProviders(<CourseByIdScreen />, {
			adapters: {
				navigationAdapter,
				routerAdapter: {
					useParams: () => ({
						id: course.id,
					}),
					replace,
				},
			},
			repositories: {
				coursesRepository: {
					courses: [course],
				},
			},
		});

		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expect(replace).toHaveBeenCalledWith(
			navigationAdapter.generateRoute({
				name: RouteName.HOME,
			}),
		);
	});

	it("should render course information", () => {
		const course: ICourse = {
			id: "course-id",
			title: "course-title",
			available: true,
			logoUrl: "course-logo-url",
			description: "course-description",
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
		};

		const replace = vi.fn();
		const generateRoute = vi.spyOn(navigationAdapter, "generateRoute");

		renderWithProviders(<CourseByIdScreen />, {
			adapters: {
				navigationAdapter,
				routerAdapter: {
					useParams: () => ({
						id: course.id,
					}),
					replace,
				},
			},
			repositories: {
				coursesRepository: {
					courses: [course],
				},
			},
		});

		// No redirect
		expect(
			screen.queryByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON),
		).toBeNull();
		expect(replace).not.toHaveBeenCalledWith(
			navigationAdapter.generateRoute({
				name: RouteName.HOME,
			}),
		);

		// Elements
		const logo = screen.getByAltText(`logo-${course.title}`);
		expect(logo).not.toBeNull();
		expect(logo.getAttribute("src")).toBe(course.logoUrl);

		const titleNode = screen.getByText(course.title);
		expect(titleNode).not.toBeNull();
		expect(titleNode.textContent).toBe(course.title);

		const descNode = screen.getByText(course.description);
		expect(descNode).not.toBeNull();
		expect(descNode.textContent).toBe(course.description);

		const chapterNode = screen.getByText("chapter-1-title");
		expect(chapterNode).not.toBeNull();
		expect(chapterNode.textContent).toBe("chapter-1-title");

		const topicNode = screen.getByText("Overview-of-load-balancers");
		expect(topicNode).not.toBeNull();
		expect(topicNode.textContent).toBe("Overview-of-load-balancers");

		// Link
		const generateRoutePayload: Parameters<
			INavigationAdapter["generateRoute"]
		>[0] = {
			name: RouteName.TOPIC_BY_ID,
			payload: {
				courseId: course.id,
				topicId: course.chapters[0].topics[0].id,
			},
		};

		const link = screen.getByRole("link", {
			name: /overview-of-load-balancers/i,
		});
		expect(link).not.toBeNull();
		expect(link.getAttribute("href")).toBe(
			navigationAdapter.generateRoute(generateRoutePayload),
		);

		expect(generateRoute).toHaveBeenCalledWith(generateRoutePayload);
	});

	it("renders correct number of chapters, topics, links, and separators", () => {
		const course: ICourse = {
			id: "course-id",
			title: "course-title",
			available: true,
			logoUrl: "course-logo-url",
			description: "course-description",
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
		};

		const replace = vi.fn();

		renderWithProviders(<CourseByIdScreen />, {
			adapters: {
				navigationAdapter,
				routerAdapter: {
					useParams: () => ({ id: course.id }),
					replace,
				},
			},
			repositories: {
				coursesRepository: { courses: [course] },
			},
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
