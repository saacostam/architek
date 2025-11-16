import type { ITopicContentMapper } from "../../domain";

export const TopicContentMapper: ITopicContentMapper = {
	// Load Balancers
	"overview-of-load-balancers": () =>
		import("../../../load-balancers/ui/components/overview-of-load-balancers"),
};
