import type { ICourse } from "@/features/courses/core/domain";

export const CDNS_COURSE: ICourse = {
	id: "cdns",
	available: false,
	title: "CDNs",
	logoUrl: "/cdns.png",
	description:
		"Explore Content Delivery Networks (CDNs), where static assets are distributed across geographically distributed edge servers, reducing latency, improving load times, and ensuring fast, reliable user experiences no matter where users are located.",
	chapters: [],
};
