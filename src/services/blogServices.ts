import { BlogPost } from "@/components/Hero";

const blogposts: BlogPost[] = [
  {
    _id: 1,
    views: 243,
    isPublished: true,
    title:
      "The Future of AI: How Artificial Intelligence is Transforming Industries",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",

    category: "technology",
    imageUrl: "/blog-1.jpg",
    author: {
      fullname: "John Doe",
      username: "johndoe",
      imageUrl: "/user-2.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 2,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 2,
    views: 24,
    isPublished: true,
    title: "10 Tips for Organizing Your Home Like a Pro",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "lifestyle",
    imageUrl: "/blog-2.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-04-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 3,
    views: 243,
    isPublished: true,
    title: "The Ultimate Guide to Backpacking Through Europe",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "travel",
    imageUrl: "/blog-3.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 4,
    views: 243,
    isPublished: true,
    title: "Strategies for Successful Remote Team Management",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "finance",
    imageUrl: "/blog-4.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 5,
    views: 243,
    isPublished: true,
    title: "Analyzing the Greatest NBA Finals of All Time",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "sports",
    imageUrl: "/blog-5.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 6,
    views: 243,
    isPublished: true,
    title: "5G Technology: Revolutionizing Mobile Connectivity",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "technology",
    imageUrl: "/blog-6.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 7,
    views: 243,
    isPublished: true,
    title: "How to Create a Capsule Wardrobe for Every Season",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "lifestyle",
    imageUrl: "/blog-7.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 8,
    views: 243,
    isPublished: true,
    title: "Top 10 Beaches to Visit in Southeast Asia",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "travel",
    imageUrl: "/blog-8.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 9,
    views: 243,
    isPublished: true,
    title: "How to Secure Funding for Your Startup",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "finance",
    imageUrl: "/blog-9.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
  {
    _id: 10,
    views: 243,
    isPublished: true,
    title: "The Evolution of Soccer Tactics Over the Decades",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "sports",
    imageUrl: "/blog-10.jpg",
    author: {
      fullname: "Great Ochuko",
      username: "greatochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      _id: 1,
    },
    dateCreated: "2024-05-22T23:00:00.000Z",
    isFeatured: false,
    tags: "",
  },
];

export function getBlogposts() {
  return blogposts;
}

export function getBlogpost(id: string) {
  return blogposts.find((blogpost) => blogpost._id === Number(id));
}

export function getBlogpostByAuthor(authorId: string) {
  return blogposts.filter(
    (blogpost) => blogpost.author._id === Number(authorId)
  );
}

export function getBlogpostByCategory(category: string) {
  return blogposts.filter(
    (blogpost) => blogpost.category.toLowerCase() === category.toLowerCase()
  );
}

export async function searchBlog(query: string) {
  await new Promise((res) => setTimeout(res, 2000));

  return blogposts.filter((blog) =>
    blog.title.toLowerCase().includes(query.split("-").join(" ").toLowerCase())
  );
}
