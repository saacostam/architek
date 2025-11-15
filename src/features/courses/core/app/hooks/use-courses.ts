import { useCallback, useMemo } from "react";
import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { COURSES, type ICourse } from "../../domain";

export function useCourses() {
	const { navigationAdapter } = useAdapters();

	const courses = COURSES;

	const getHrefToCourse = useCallback(
		(course: ICourse) =>
			navigationAdapter.generateRoute({
				name: RouteName.COURSE_BY_ID,
				payload: { id: course.id },
			}),
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
