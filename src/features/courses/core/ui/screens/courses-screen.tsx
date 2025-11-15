import { Flex } from "@radix-ui/themes";
import { Header } from "@/shared/components/header";
import { COURSES } from "../../domain";
import { AllCourses } from "../components";

export function CoursesScreen() {
	return (
		<Flex direction="column" gap="4">
			<Header>Courses</Header>
			<AllCourses courses={COURSES} />
		</Flex>
	);
}
