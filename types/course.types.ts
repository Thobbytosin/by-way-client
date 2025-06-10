import { TUser } from "./user.types";

export type Review = {
  user: TUser;
  rating: number;
  comment: string;
  commentReplies?: { user: TUser; reply: string }[];
};

export type Comment = {
  user: TUser;
  question: string;
  questionReplies: { user: TUser; answer: string }[];
};

export type CourseData = {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoDescription: string;
  videoDuration: number;
  links: { title: string; url: string }[];
  objectives: { title: string }[];
  suggestion: string;
  questions?: Comment[];
};

export type Course = {
  _id: string;
  name: string;
  description: string;
  demoUrl: string;
  price: number;
  estimatedPrice: number;
  thumbnail: { id: string; url: string } | string;
  tags: string;
  level: string;
  demoVideo: { id: string; url: string } | string;
  category: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: Review[] | never[];
  courseData: CourseData[];
  ratings: number;
  purchase: number;
};

export type CourseQueryOptions = {
  type:
    | "free-list"
    | "auth-course"
    | "free-course"
    | "course-content"
    | "all-courses";
  courseId?: string;
};
