import { Flex } from "@radix-ui/themes";
import { useEffect } from "react";
import { GenericScreenSkeleton } from "@/features/layouts/ui";
import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { useCourses } from "../../app";
import { CourseChapters } from "../components";

export function CourseByIdScreen() {
	const { navigationAdapter, routerAdapter } = useAdapters();
	const { courses } = useCourses();

	const { id } = routerAdapter.useParams();
	const course = courses.find((c) => c.id === id);

	const invalidRoute = !id || !course || !course.available;

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

	return (
		<Flex direction="column" gap="4">
			<CourseChapters course={course} />
		</Flex>
	);
}
