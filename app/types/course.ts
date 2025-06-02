import { User } from "./api";

export type Review = {
  user: User;
  rating: number;
  comment: string;
  commentReplies?: { user: User; reply: string }[];
};

export type Comment = {
  user: User;
  question: string;
  questionReplies: { user: User; answer: string }[];
};

export type CourseData = {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoDescription: string;
  videoDuration: number;
  videoPlayer: string;
  links: { title: string; url: string }[];
  objectives: { title: string }[];
  suggestion: string;
  questions: Comment[];
};

export type Course = {
  _id: string;
  name: string;
  description: string;
  demoUrl: string;
  price: number;
  estimatedPrice: number;
  thumbnail: { id: string; url: string };
  tags: string;
  level: string;
  demoVideo: object;
  category: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: Review[];
  courseData: CourseData[];
  ratings: number;
  purchase: number;
};
