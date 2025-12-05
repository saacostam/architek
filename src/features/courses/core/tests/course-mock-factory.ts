import type { ICourse } from "../domain";

export const CourseMockFactory = {
	counter: 0,

	create(args: { available: boolean; overrides?: Partial<ICourse> }): ICourse {
		this.counter++;
		const id = String(this.counter);

		const base: ICourse = {
			id,
			available: args.available,
			title: `Course ${id} Title`,
			description: `Course ${id} Description`,
			logoUrl: `http://google.com/${id}`,
			chapters: [
				{
					title: `Course ${id} - Chapter 1`,
					topics: [],
				},
			],
		};

		return {
			...base,
			...args.overrides,
			chapters: args.overrides?.chapters ?? base.chapters,
		};
	},
};
