import Hero from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";

const blogPosts = [
  {
    id: 1,
    title:
      "The Future of AI: How Artificial Intelligence is Transforming Industries",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",

    category: "technology",
    imageUrl: "/blog-1.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 2,
    title: "10 Tips for Organizing Your Home Like a Pro",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "lifestyle",
    imageUrl: "/blog-2.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Backpacking Through Europe",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "travel",
    imageUrl: "/blog-3.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 4,
    title: "Strategies for Successful Remote Team Management",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "business",
    imageUrl: "/blog-4.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 5,
    title: "Analyzing the Greatest NBA Finals of All Time",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "sports",
    imageUrl: "/blog-5.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 6,
    title: "5G Technology: Revolutionizing Mobile Connectivity",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "technology",
    imageUrl: "/blog-6.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 7,
    title: "How to Create a Capsule Wardrobe for Every Season",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "lifestyle",
    imageUrl: "/blog-7.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 8,
    title: "Top 10 Beaches to Visit in Southeast Asia",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "travel",
    imageUrl: "/blog-8.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 9,
    title: "How to Secure Funding for Your Startup",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "business",
    imageUrl: "/blog-9.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 10,
    title: "The Evolution of Soccer Tactics Over the Decades",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio, veritatis aliquid voluptatum maxime nisi, quod sunt libero laudantium earum soluta, magnam sint dolorem impedit at omnis!",
    category: "sports",
    imageUrl: "/blog-10.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
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
