import type { ITopicContentMapper } from "../domain";

export const topicContentMapper: ITopicContentMapper = {
	// Load Balancers
	"overview-of-load-balancers": () =>
		import("../../load-balancers/ui/components/overview-of-load-balancers"),
};
