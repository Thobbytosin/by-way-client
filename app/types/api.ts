export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
};

export type ApiError = ApiResponse & { success: false };

export type ApiSuccess<T> = ApiResponse<T> & {
  success: true;
  data: T;
};

export type User = {
  _id: string;
  name: string;
  role: string;
  avatar: { id: string; url: string };
  courses: {
    courseId: string;
    progress: { videoId: string; viewed: boolean; _id: string }[];
  }[];
  email: string;
  isVerified: boolean;
};
