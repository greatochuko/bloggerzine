export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  imageUrl: string;
  coverImageUrl: string;
  bio: string;
  jobTitle: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
  createdAt: string;
  emailVerified: boolean;
};

export type CategoryType = {
  name: string;
  imageUrl: string;
  color: string;
  description: string;
};

export type CommentType = {
  id: number;
  blogpost: BlogpostType;
  user: UserType;
  comment: string;
  createdAt: string;
  parentId: null | number;
  rootCommentId: null | number;
};

export type BlogpostType = {
  id: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  author: UserType;
  tags: string;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
};

export type LikeType = {
  id: string;
  user: string;
  author: string;
  blogpost: string;
  createdAt: string;
};
