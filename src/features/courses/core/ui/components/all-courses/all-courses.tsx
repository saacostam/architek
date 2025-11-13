import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { useCourses } from "../../../app";

export function AllCourses() {
    const { courses, getHrefToCourse } = useCourses();

    return <Flex direction="row" gap="4">
        {courses.map(course => <Link className="clean-link" to={getHrefToCourse(course)}>
            <Card key={course.id}>
                <Heading mb="4" size="6">{course.title}</Heading>
                <Heading mb="2" size="5">{course.description.title}</Heading>
                {course.description.paragraphs.map(p => <Text size="4">{p}</Text>)}
            </Card>
        </Link>)}
    </Flex>
}
