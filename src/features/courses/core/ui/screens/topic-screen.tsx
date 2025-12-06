import { useEffect } from "react";
import { GenericScreenSkeleton } from "@/features/layouts/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { useCourses } from "../../app";
import { Topic } from "../components";

export function TopicScreen() {
	const { navigationAdapter, routerAdapter } = useAdapters();
	const { courses } = useCourses();

	const { courseId, topicId } = routerAdapter.useParams();
	const course = courses.find((c) => c.id === courseId);

	const topic = course?.chapters
		.flatMap((c) => c.topics)
		.find((t) => t.id === topicId);

	const invalidRoute =
		!courseId || !course || !course.available || !topicId || !topic;

	useEffect(() => {
		if (invalidRoute) {
			routerAdapter.replace(
				navigationAdapter.generateRoute({
					name: RouteName.HOME,
				}),
			);
		}
	}, [invalidRoute, navigationAdapter, routerAdapter]);

	if (invalidRoute) {
		return <GenericScreenSkeleton />;
	}

	return <Topic course={course} topic={topic} />;
}
