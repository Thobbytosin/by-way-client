export type UserDetail = {
  name: string;
  role: string;
  avatar: { id: string; url: string };
};

export type LessonStatus = {
  courseId: string;
  progress: { videoId: string; viewed: boolean; _id: string }[];
  reviewed: boolean;
};

export type TUser = {
  _id: string;
  name: string;
  role: string;
  avatar: { id: string; url: string };
  courses: LessonStatus[];
  email: string;
  isVerified: boolean;
};

export interface AuthState {
  user: TUser | null;
}
