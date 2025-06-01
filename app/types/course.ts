export type CoursesFree = {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoVideo: object;
  category: string;
  benefits: { title: string[] };
  prerequisites: { title: string[] };
  //   reviews: IReview[];
  //   courseData: ICourseData[];
  ratings: number;
  purchase: number;
};
