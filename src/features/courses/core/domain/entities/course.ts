import type { ReactNode } from "react";

export interface ICourse {
    id: string;
  title: string;
  logoUrl: string;
  description: ICourseDescription;
  chapters: IChapter[];
}

export interface ICourseDescription {
  title: string;
  paragraphs: string[];
}

export interface IChapter {
    title: string;
    topics: ITopic[];
}

export interface ITopic {
    id: string;
    title: string;
    content: ReactNode;
}
