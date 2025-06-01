export type UserDetail = {
  name: string;
  role: string;
  avatar: { id: string; url: string };
};

export type UserList = { data: UserDetail }[];
