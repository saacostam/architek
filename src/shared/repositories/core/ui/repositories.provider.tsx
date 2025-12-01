import { type PropsWithChildren, useMemo } from "react";
import type { ICoursesRepository } from "@/features/courses/core/domain";
import { CoursesRepository } from "@/features/courses/core/infra";
import { RepositoriesContext } from "../app";
import type { IRepositories } from "../domain";

export function RepositoriesProvider({ children }: PropsWithChildren) {
	const coursesRepository: ICoursesRepository = useMemo(
		() => new CoursesRepository(),
		[],
	);

	const repositories: IRepositories = useMemo(
		() => ({
			coursesRepository,
		}),
		[coursesRepository],
	);

	return (
		<RepositoriesContext.Provider value={repositories}>
			{children}
		</RepositoriesContext.Provider>
	);
}
