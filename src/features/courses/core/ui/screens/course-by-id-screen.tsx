import { Flex } from "@radix-ui/themes";
import { GenericScreenSkeleton } from "@/features/layouts/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { useCourses } from "../../app";
import { CourseChapters } from "../components";

export function CourseByIdScreen() {
	const { routerAdapter } = useAdapters();
	const { courses } = useCourses();

	const { id } = routerAdapter.useParams();
	const course = courses.find((c) => c.id === id);

	if (!id || !course) {
		return <GenericScreenSkeleton />;
	}

	return (
		<Flex direction="column" gap="4">
			<CourseChapters course={course} />
		</Flex>
	);
}
