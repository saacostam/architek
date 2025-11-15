import type { ReactNode } from "react";

export interface ICourse {
    id: string;
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
    id: string;
    title: string;
    content: ReactNode;
}
