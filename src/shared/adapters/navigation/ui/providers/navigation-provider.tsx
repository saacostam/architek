import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
import { CoursesScreen } from "@/features/courses/core/ui";
import { AppLayout } from "@/features/layouts/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { ErrorScreen } from "@/shared/adapters/errors/ui";
import { RouteName } from "../../domain";
import { LazyLoadingRouteSkeleton } from "../components";

// Lazy imports
const CourseByIdScreen = lazy(() =>
	import("@/features/courses/core/ui/screens/course-by-id-screen").then(
		(m) => ({ default: m.CourseByIdScreen }),
	),
);

const TopicScreen = lazy(() =>
	import("@/features/courses/core/ui/screens/topic-screen").then((m) => ({
		default: m.TopicScreen,
	})),
);

export function NavigationProvider() {
	const { navigationAdapter } = useAdapters();

	return (
		<Suspense fallback={<LazyLoadingRouteSkeleton />}>
			<Routes>
				<Route
					element={
						<AppLayout>
							<Outlet />
						</AppLayout>
					}
				>
					<Route index element={<CoursesScreen />} />
					<Route
						path={navigationAdapter.defineRoute(RouteName.COURSE_BY_ID)}
						element={<CourseByIdScreen />}
					/>
					<Route
						path={navigationAdapter.defineRoute(RouteName.TOPIC_BY_ID)}
						element={<TopicScreen />}
					/>
				</Route>
				<Route
					path="*"
					element={
						<ErrorScreen
							resetHref={navigationAdapter.generateRoute({
								name: RouteName.HOME,
							})}
						/>
					}
				/>
			</Routes>
		</Suspense>
	);
}
