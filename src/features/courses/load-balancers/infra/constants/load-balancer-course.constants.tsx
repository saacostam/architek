import type { ICourse } from "@/features/courses/core/domain";

export const LOAD_BALANCER_COURSE: ICourse = {
  id: "load-balancers",
  title: "Load Balancers",
  logoUrl: "/load-balancer.png",
  description: {
    title: "Overview",
    paragraphs: [
      "Explore the fundamentals of Load Balancers in Cloud Computing, understanding their role in distributing traffic efficiently across servers to optimize performance and ensure high availability.",
      "Understanding load balancers is crucial for anyone involved in designing, developing, or maintaining scalable and high-performance web applications. Below is a curriculum that covers the fundamental concepts, types, and best practices related to load balancers:",
    ],
  },
  chapters: [
    {
      title: "Introduction to Load Balancers",
      topics: [
        {
          id: "overview-of-load-balancers",
          title: "Overview of Load Balancers",
          content: null,
        },
      ],
    },
  ],
};
