import { getBlogpostByAuthor } from "./blogServices";

const comments = [
  {
    id: 1,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 2,
    },
    user: {
      name: "John Doe",
      imageUrl: "/user-2.jpg",
      id: 2,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: null,
  },
  {
    id: 2,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 2,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: 1,
  },

  {
    id: 4,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 2,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: null,
  },
  {
    id: 5,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 2,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: 4,
  },
  {
    id: 7,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 2,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "2024-05-22T23:00:00.000Z",
    parentId: 5,
  },
]

export function getComments(blogId:string){
    return comments.filter(comment=>comment.blog.id.toString()===blogId);
}

export function getCommentsByAuthor(authorId:string){
  const authorPosts = getBlogpostByAuthor(authorId)
  const authorPostIds = authorPosts.map(post=>post.id)
  const authorComments = comments.filter(comment=>authorPostIds.includes(comment.blog.id))
  return authorComments
}