import { CDNS_COURSE } from "@/features/courses/cdns/domain";
import { LOAD_BALANCER_COURSE } from "@/features/courses/load-balancers/domain";
import type { ICourse, ICoursesRepository } from "../domain";

export class CoursesRepository implements ICoursesRepository {
	courses: ICourse[] = [LOAD_BALANCER_COURSE, CDNS_COURSE];
}
