import Hero, { Blogpost } from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";
import { getBlogposts } from "@/services/blogServices";

export default async function Home() {
  const blogposts: Blogpost[] = await getBlogposts();

  const featuredPosts = blogposts
    .filter((post) => post.isFeatured)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);
  const topPosts = [...blogposts].sort((a, b) => b.views - a.views).slice(0, 6);
  const recentPosts = [...blogposts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <div className={styles["home-page"]}>
      <Hero blogposts={featuredPosts} />
      <MainArea topPosts={topPosts} recentPosts={recentPosts} />
    </div>
  );
}
