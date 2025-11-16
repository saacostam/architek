export interface ICourse {
	id: string;
	available: boolean;
	title: string;
	logoUrl: string;
	description: string;
	chapters: IChapter[];
}

export interface IChapter {
	title: string;
	topics: ITopic[];
}

export interface ITopic {
	id: ITopicId;
	title: string;
}

export type ITopicId = "overview-of-load-balancers";

export type ITopicContentMapper = Record<
	ITopicId,
	() => Promise<{ default: React.ComponentType }>
>;
