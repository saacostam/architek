import { Flex } from "@radix-ui/themes";
import { lazy, Suspense } from "react";
import { Header, SubHeader } from "@/shared/components";
import type { ICourse, ITopic } from "../../../domain";
import { TopicContentMapper } from "../../mapping";

export interface TopicProps {
	course: ICourse;
	topic: ITopic;
}

export function Topic({ course, topic }: TopicProps) {
	const Content = lazy(TopicContentMapper[topic.id]);

	return (
		<>
			<Flex
				direction={{ initial: "column", xs: "row" }}
				gap="4"
				my="4"
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
			<Suspense fallback={null}>
				<Content />
			</Suspense>
		</>
	);
}
