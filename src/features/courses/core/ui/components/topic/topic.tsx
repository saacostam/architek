import { Flex } from "@radix-ui/themes";
import { lazy, Suspense } from "react";
import { GenericScreenSkeleton } from "@/features/layouts/ui";
import { Header, SubHeader } from "@/shared/components";
import { useRepositories } from "@/shared/repositories/core/app";
import type { ICourse, ITopic } from "../../../domain";

export interface TopicProps {
	course: ICourse;
	topic: ITopic;
}

export function Topic({ course, topic }: TopicProps) {
	const { coursesRepository } = useRepositories();

	const Content = lazy(coursesRepository.topicContentMapper[topic.id]);

	return (
		<>
			<Flex
				direction={{ initial: "column", xs: "row" }}
				gap="4"
				mt="4"
				mb="6"
				wrap="wrap"
			>
				<img
					src={course.logoUrl}
					alt={`logo-${course.title.toLowerCase()}`}
					height={128}
					width={128}
				/>
				<Flex direction="column" justify="center" flexBasis="1">
					<Header>{topic.title}</Header>
					<SubHeader style={{ color: "inherit" }}>{course.title}</SubHeader>
				</Flex>
			</Flex>
			<Suspense fallback={<GenericScreenSkeleton />}>
				<Content />
			</Suspense>
		</>
	);
}
