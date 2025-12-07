import type { ICourse, ITopicContentMapper } from "../entities";

export interface ICoursesRepository {
	courses: ICourse[];
	topicContentMapper: ITopicContentMapper;
}
