import { CDNS_COURSE } from "@/features/courses/cdns/domain";
import { LOAD_BALANCER_COURSE } from "@/features/courses/load-balancers/domain";
import type {
	ICourse,
	ICoursesRepository,
	ITopicContentMapper,
} from "../domain";
import { topicContentMapper } from "./topic-content-mapper";

export class CoursesRepository implements ICoursesRepository {
	courses: ICourse[] = [LOAD_BALANCER_COURSE, CDNS_COURSE];
	topicContentMapper: ITopicContentMapper = topicContentMapper;
}
