import Hero from "@/components/Hero";
import styles from "./page.module.css";

const blogPosts = [
  {
    id: 1,
    title:
      "The Future of AI: How Artificial Intelligence is Transforming Industries",
    category: "technology",
    imageUrl: "/blog-1.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 2,
    title: "10 Tips for Organizing Your Home Like a Pro",
    category: "lifestyle",
    imageUrl: "/blog-2.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Backpacking Through Europe",
    category: "travel",
    imageUrl: "/blog-3.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 4,
    title: "Strategies for Successful Remote Team Management",
    category: "business",
    imageUrl: "/blog-4.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 5,
    title: "Analyzing the Greatest NBA Finals of All Time",
    category: "sports",
    imageUrl: "/blog-5.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 6,
    title: "5G Technology: Revolutionizing Mobile Connectivity",
    category: "technology",
    imageUrl: "/blog-6.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 7,
    title: "How to Create a Capsule Wardrobe for Every Season",
    category: "lifestyle",
    imageUrl: "/blog-7.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 8,
    title: "Top 10 Beaches to Visit in Southeast Asia",
    category: "travel",
    imageUrl: "/blog-8.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 9,
    title: "How to Secure Funding for Your Startup",
    category: "business",
    imageUrl: "/blog-9.jpg",
    author: { name: "Great", imageUrl: "/profile-pic.jpg" },
    lastModified: "24 may 2024",
  },
  {
    id: 10,
    title: "The Evolution of Soccer Tactics Over the Decades",
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
    </div>
  );
}
