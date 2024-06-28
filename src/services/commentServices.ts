import { CommentType } from "@/components/Comment";
import { getBlogpostByAuthor } from "./blogServices";
import { createClient } from "@/utils/supabase/client";

const comments: CommentType[] = [
  {
    id: 1,
    blogpost: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: "2",
    },
    user: {
      fullname: "John Doe",
      username: "johndoe",
      imageUrl: "/user-2.jpg",
      id: "2",
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    createdAt: "2024-05-22T23:00:00.000Z",
    parentId: null,
  },
  {
    id: "2",
    blogpost: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: "2",
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    createdAt: "2024-05-22T23:00:00.000Z",
    parentId: 1,
  },

  {
    id: 4,
    blogpost: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: "2",
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    createdAt: "2024-05-22T23:00:00.000Z",
    parentId: null,
  },
  {
    id: 5,
    blogpost: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: "2",
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    createdAt: "2024-05-22T23:00:00.000Z",
    parentId: 4,
  },
  {
    id: 7,
    blogpost: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: "2",
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    createdAt: "2024-05-22T23:00:00.000Z",
    parentId: 5,
  },
];

export async function getComments(blogId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*, blogpost(*), user(*)")
    .eq("blogpost", blogId);


  return data || [];
}

export function getCommentsByAuthor(authorId: string) {
  const authorPosts = getBlogpostByAuthor(authorId);
  const authorPostIds = authorPosts.map((post) => post.id);
  const authorComments = comments.filter((comment) =>
    authorPostIds.includes(comment.blogpost.id)
  );
  return authorComments;
}

export function getUserComments() {
  const authorPosts = getBlogpostByAuthor("1");
  const authorPostIds = authorPosts.map((post) => post.id);
  const authorComments = comments.filter((comment) =>
    authorPostIds.includes(comment.blogpost.id)
  );
  return authorComments;
}
