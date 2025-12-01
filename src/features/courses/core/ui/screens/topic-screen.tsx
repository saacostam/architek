import { GenericScreenSkeleton } from "@/features/layouts/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { useCourses } from "../../app";
import { Topic } from "../components";

export function TopicScreen() {
	const { routerAdapter } = useAdapters();
	const { courses } = useCourses();

	const { courseId, topicId } = routerAdapter.useParams();
	const course = courses.find((c) => c.id === courseId);

	if (!courseId || !course) {
		return <GenericScreenSkeleton />;
	}

	const topic = course.chapters
		.flatMap((c) => c.topics)
		.find((t) => t.id === topicId);

	if (!topicId || !topic) {
		return <GenericScreenSkeleton />;
	}

	return <Topic course={course} topic={topic} />;
}
