import { Flex } from "@radix-ui/themes";
import { AllCourses } from "../components";
import { Header } from "@/shared/components/header";

export function CoursesScreen() {
    return <Flex direction="column" gap="4">
        <Header>Courses</Header>
        <AllCourses />
    </Flex>
}
