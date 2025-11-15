import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { useCourses } from "../../../app";
import { SubHeader } from "@/shared/components";

export function AllCourses() {
    const { courses, getHrefToCourse } = useCourses();

    return <Flex direction="row" gap="4">
        {courses.map(course => <Link className="clean-link" to={getHrefToCourse(course)}>
            <Card key={course.id}>
                <SubHeader mb="4">{course.title}</SubHeader>
                <Text>{course.description}</Text>
            </Card>
        </Link>)}
    </Flex>
}
