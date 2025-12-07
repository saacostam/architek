import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { NavigationAdapter } from "@/shared/adapters/navigation/infra";
import { renderWithProviders, TestIdSelector } from "@/shared/tests";
import type { ICourse, ITopicContentMapper } from "../../domain";
import { topicContentMapper } from "../../infra/topic-content-mapper";
import { CourseMockFactory } from "../../tests";
import { TopicScreen } from "./topic-screen";

const navigationAdapter = new NavigationAdapter();

function setupTest(args: {
	courses: ICourse[];
	courseId?: string;
	topicId?: string;
	topicContentMapper?: ITopicContentMapper;
}) {
	const { courses, courseId, topicId } = args;

	const replace = vi.fn();

	renderWithProviders(<TopicScreen />, {
		adapters: {
			navigationAdapter,
			routerAdapter: {
				useParams: () => ({
					courseId,
					topicId,
				}),
				replace,
			},
		},
		repositories: {
			coursesRepository: {
				courses,
				topicContentMapper: args.topicContentMapper ?? topicContentMapper,
			},
		},
	});

	return { replace };
}

function expectRedirectToHome(replace: ReturnType<typeof vi.fn>) {
	expect(replace).toHaveBeenCalledWith(
		navigationAdapter.generateRoute({ name: RouteName.HOME }),
	);
}

const mockChapters = [
	{
		title: "chatpter-1",
		topics: [
			{
				id: "overview-of-load-balancers" as const,
				title: "Overview of Load Balancers",
			},
		],
	},
];

describe("TopicScreen", () => {
	it("should redirect to home if courseId is missing", () => {
		const { replace } = setupTest({
			courseId: undefined,
			topicId: "topic-id",
			courses: [],
		});
		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should redirect to home if topicId is missing", () => {
		const course = CourseMockFactory.create({ available: true });

		const { replace } = setupTest({
			courseId: course.id,
			topicId: undefined,
			courses: [course],
		});
		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should redirect to home if courseId is invalid", () => {
		const course = CourseMockFactory.create({
			available: true,
			overrides: {
				chapters: mockChapters,
			},
		});

		const { replace } = setupTest({
			courseId: `${course.id}+invalid`,
			topicId: course.chapters[0].topics[0].id,
			courses: [course],
		});
		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should redirect to home if topicId is invalid", () => {
		const course = CourseMockFactory.create({
			available: true,
			overrides: {
				chapters: mockChapters,
			},
		});

		const { replace } = setupTest({
			courseId: course.id,
			topicId: `${course.chapters[0].topics[0].id}+invalid`,
			courses: [course],
		});
		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should redirect home if course is not available", () => {
		const course = CourseMockFactory.create({
			available: false,
			overrides: {
				chapters: mockChapters,
			},
		});

		const { replace } = setupTest({
			courseId: course.id,
			topicId: course.chapters[0].topics[0].id,
			courses: [course],
		});
		screen.getByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON);
		expectRedirectToHome(replace);
	});

	it("should show topic info", () => {
		const course = CourseMockFactory.create({
			available: true,
			overrides: {
				chapters: mockChapters,
			},
		});

		const topic = course.chapters[0].topics[0];

		const { replace } = setupTest({
			courseId: course.id,
			topicId: topic.id,
			courses: [course],
			topicContentMapper: {
				"overview-of-load-balancers": () =>
					new Promise((res) =>
						res({ default: () => <div data-testid="lazy-loaded-content" /> }),
					),
			} as unknown as ITopicContentMapper,
		});

		waitFor(() => {
			expect(
				screen.queryByTestId(TestIdSelector.GENERIC_SCREEN_SKELETON),
			).toBeNull();
			expect(replace).not.toHaveBeenCalled();
		});

		// Metadata
		expect(screen.getByRole("img").getAttribute("src")).toBe(course.logoUrl);
		expect(screen.getByText(topic.title).textContent).toBe(topic.title);
		expect(screen.getByText(course.title).textContent).toBe(course.title);

		// Lazy-loaded content
		waitFor(() => {
			expect(screen.getByTestId("lazy-loaded-content")).toBeDefined();
		});
	});
});
