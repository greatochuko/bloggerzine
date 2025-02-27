import Hero, { BlogpostType } from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";
import { getBlogposts } from "@/services/blogServices";
import FeaturedPosts from "@/components/FeaturedPosts";

export default async function Home() {
  const blogposts: BlogpostType[] = await getBlogposts();

  const featuredPosts = blogposts
    .filter((post) => post.isFeatured)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const popularPosts = [...blogposts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  const recentPosts = [...blogposts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className={styles["home-page"]}>
      <Hero />
      <FeaturedPosts blogposts={featuredPosts} />
      <MainArea popularPosts={popularPosts} recentPosts={recentPosts} />
    </div>
  );
}
