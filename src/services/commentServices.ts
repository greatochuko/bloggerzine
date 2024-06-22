import { getBlogpostByAuthor } from "./blogServices";

const comments = [
  {
    _id: 1,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      _id: 2,
    },
    user: {
      fullname: "John Doe",
      username: "johndoe",
      imageUrl: "/user-2.jpg",
      _id: 2,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: null,
  },
  {
    _id: 2,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      _id: 2,
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      _id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: 1,
  },

  {
    _id: 4,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      _id: 2,
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      _id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: null,
  },
  {
    _id: 5,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      _id: 2,
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      _id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: 4,
  },
  {
    _id: 7,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      _id: 2,
    },
    user: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      _id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: 5,
  },
];

export function getComments(blogId: string) {
  return comments.filter((comment) => comment.blog._id.toString() === blogId);
}

export function getCommentsByAuthor(authorId: string) {
  const authorPosts = getBlogpostByAuthor(authorId);
  const authorPostIds = authorPosts.map((post) => post._id);
  const authorComments = comments.filter((comment) =>
    authorPostIds.includes(comment.blog._id)
  );
  return authorComments;
}

export function getUserComments() {
  const authorPosts = getBlogpostByAuthor("1");
  const authorPostIds = authorPosts.map((post) => post._id);
  const authorComments = comments.filter((comment) =>
    authorPostIds.includes(comment.blog._id)
  );
  return authorComments;
}
