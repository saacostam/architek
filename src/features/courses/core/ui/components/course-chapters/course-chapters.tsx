import { Card, Flex, Separator, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { useAdapters } from "@/shared/adapters/core/app";
import { RouteName } from "@/shared/adapters/navigation/domain";
import { Header } from "@/shared/components";
import { BookIcon } from "@/shared/icons";
import type { ICourse } from "../../../domain";

export interface CourseChaptersProps {
	course: ICourse;
}

export function CourseChapters({ course }: CourseChaptersProps) {
	const { navigationAdapter } = useAdapters();

	return (
		<>
			<Flex align="center" direction="column" gap="4" mb="4">
				<img
					src={course.logoUrl}
					height="128px"
					width="128px"
					alt={`logo-${course.title}`}
				/>
				<Header size="8">{course.title}</Header>
			</Flex>
			<Text mb="2">{course.description}</Text>
			<Flex direction="column" gap="4">
				{course.chapters.map((chapter) => (
					<Card key={chapter.title} size="3">
						<Header>{chapter.title}</Header>
						<Separator orientation="horizontal" size="4" my="4" />
						{chapter.topics.map((topic) => (
							<Link
								key={topic.id}
								className="clean-link"
								to={navigationAdapter.generateRoute({
									name: RouteName.TOPIC_BY_ID,
									payload: { courseId: course.id, topicId: topic.id },
								})}
							>
								<Flex align="center" direction="row" gap="2">
									<BookIcon height={24} width={24} />
									<Text>{topic.title}</Text>
								</Flex>
							</Link>
						))}
					</Card>
				))}
			</Flex>
		</>
	);
}
