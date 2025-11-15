import { useCallback, useMemo } from "react";
import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import type { ICourse } from "../../domain";

export interface UseCoursesArgs {
	courses: ICourse[];
}

export function useCourses({ courses: _courses }: UseCoursesArgs) {
	const { navigationAdapter } = useAdapters();

	const courses = useMemo(() => {
		return _courses.sort((a, b) => {
			const val = (course: ICourse) => (course.available ? 1 : 0);
			return val(b) - val(a);
		});
	}, [_courses]);

	const getHrefToCourse = useCallback(
		(course: ICourse): string => {
			if (!course.available) return "#";

			return navigationAdapter.generateRoute({
				name: RouteName.COURSE_BY_ID,
				payload: { id: course.id },
			});
		},
		[navigationAdapter],
	);

	return useMemo(
		() => ({
			courses,
			getHrefToCourse,
		}),
		[courses, getHrefToCourse],
	);
}
