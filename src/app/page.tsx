import Hero, { BlogPost } from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    views: 243,
    status: "published",
    title:
      "The Future of AI: How Artificial Intelligence is Transforming Industries",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",

    category: "technology",
    imageUrl: "/blog-1.jpg",
    author: {
      name: "John Doe",
      imageUrl: "/user-2.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 2,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 2,
    views: 243,
    status: "draft",
    title: "10 Tips for Organizing Your Home Like a Pro",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "lifestyle",
    imageUrl: "/blog-2.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 3,
    views: 243,
    status: "published",
    title: "The Ultimate Guide to Backpacking Through Europe",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "travel",
    imageUrl: "/blog-3.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 4,
    views: 243,
    status: "published",
    title: "Strategies for Successful Remote Team Management",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "finance",
    imageUrl: "/blog-4.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 5,
    views: 243,
    status: "draft",
    title: "Analyzing the Greatest NBA Finals of All Time",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "sports",
    imageUrl: "/blog-5.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 6,
    views: 243,
    status: "published",
    title: "5G Technology: Revolutionizing Mobile Connectivity",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "technology",
    imageUrl: "/blog-6.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 7,
    views: 243,
    status: "published",
    title: "How to Create a Capsule Wardrobe for Every Season",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "lifestyle",
    imageUrl: "/blog-7.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 8,
    views: 243,
    status: "published",
    title: "Top 10 Beaches to Visit in Southeast Asia",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "travel",
    imageUrl: "/blog-8.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 9,
    views: 243,
    status: "published",
    title: "How to Secure Funding for Your Startup",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "finance",
    imageUrl: "/blog-9.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
  {
    id: 10,
    views: 243,
    status: "published",
    title: "The Evolution of Soccer Tactics Over the Decades",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "sports",
    imageUrl: "/blog-10.jpg",
    author: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
      id: 1,
    },
    dateCreated: "24 may 2024",
  },
];

export default function Home() {
  return (
    <div className={styles["home-page"]}>
      <Hero blogPosts={blogPosts.slice(0, 4)} />
      <MainArea
        topPosts={blogPosts.slice(0, 6)}
        recentPosts={blogPosts.slice(6, 10)}
      />
    </div>
  );
}
