export type BannerContent = {
  _id: string;
  type: "Banner";
  banner: {
    image: {
      id: string;
      url: string;
    };
    title: string;
    subTitle: string;
  };
  categories: [];
  faq: [];
};

export type CategoriesContent = {
  _id: string;
  type: "Categories";
  categories: { title: string; _id: string }[];
  faq: [];
};

export type FAQsContent = {
  _id: string;
  type: "FAQ";
  faq: { question: string; answer: string; _id: string }[];
  categories: [];
};
