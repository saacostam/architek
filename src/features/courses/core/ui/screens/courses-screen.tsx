import { Flex, Heading } from "@radix-ui/themes";
import { AllCourses } from "../components";

export function CoursesScreen() {
    return <Flex direction="column" gap="4">
        <Heading>Courses</Heading>
        <AllCourses />
    </Flex>
}
