import type { ICourse } from "../domain";

export const CourseMockFactory = {
	counter: 0,
	create(args: { available: boolean }): ICourse {
		CourseMockFactory.counter++;
		const id = String(CourseMockFactory.counter);

		return {
			id,
			available: args.available,
			title: `Course ${id}`,
			description: `Course ${id}`,
			logoUrl: `http://google.com`,
			chapters: [
				{
					title: `Course ${id} - Chapter 1`,
					topics: [],
				},
			],
		};
	},
};
