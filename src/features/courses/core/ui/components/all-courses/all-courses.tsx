import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { SubHeader } from "@/shared/components";
import { useCourses } from "../../../app";
import type { ICourse } from "../../../domain";

export interface AllCoursesProps {
	courses: ICourse[];
}

export function AllCourses({ courses: _courses }: AllCoursesProps) {
	const { courses, getHrefToCourse } = useCourses({
		courses: _courses,
	});

	return (
		<Flex direction="column" gap="4">
			{courses.map((course) => (
				<Link
					className="clean-link"
					to={getHrefToCourse(course)}
					key={course.id}
					style={!course.available ? { opacity: 0.6 } : {}}
				>
					<Card size="3">
						<Flex direction={{ initial: "column", xs: "row" }} gap="6">
							<img
								src={course.logoUrl}
								height="96px"
								width="96px"
								alt={`logo-${course.title}`}
							/>
							<div>
								<Flex
									align="center"
									direction="row"
									gap="2"
									justify="between"
									mb="3"
									wrap="wrap"
								>
									<SubHeader>{course.title}</SubHeader>
									{!course.available && <Badge color="lime">Coming Soon</Badge>}
								</Flex>
								<Text>{course.description}</Text>
							</div>
						</Flex>
					</Card>
				</Link>
			))}
		</Flex>
	);
}
