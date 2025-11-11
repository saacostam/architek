import { Card, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router";
import { useCourses } from "../../../app";

export function AllCourses() {
    const { courses, getHrefToCourse } = useCourses();

    return <Flex direction="row" gap="4">
        {courses.map(course => <Link to={getHrefToCourse(course)}>
            <Card key={course.id}>
            <Heading>{course.title}</Heading>
        </Card>
        </Link>)}
    </Flex>
}
