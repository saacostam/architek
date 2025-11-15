import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
import { useAdapters } from "@/shared/adapters/core/app";
import { ErrorScreen } from "@/shared/adapters/errors/ui";
import { CourseByIdScreen, CoursesScreen } from "@/features/courses/core/ui";
import { AppLayout } from "@/features/layouts/ui";
import { LazyLoadingRouteSkeleton } from "../components";
import { RouteName } from "../../domain";

// Lazy imports
// const Screen = lazy(() =>
// 	import("@/path-to-file").then(
// 		(m) => ({ default: m.Screen }),
// 	),
// );

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
