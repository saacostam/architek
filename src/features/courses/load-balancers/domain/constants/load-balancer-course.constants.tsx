import type { ICourse } from "@/features/courses/core/domain";

export const LOAD_BALANCER_COURSE: ICourse = {
	id: "load-balancers",
	available: true,
	title: "Load Balancers",
	logoUrl: "/load-balancer.png",
	description:
		"Explore the fundamentals of Load Balancers in Cloud Computing, understanding their role in distributing traffic efficiently across servers to optimize performance and ensure high availability.",
	chapters: [
		{
			title: "Introduction to Load Balancers",
			topics: [
				{
					id: "overview-of-load-balancers",
					title: "Overview of Load Balancers",
					content: null,
				},
			],
		},
	],
};
