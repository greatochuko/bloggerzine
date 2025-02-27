import Hero, { BlogpostType } from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";
import { getBlogposts } from "@/services/blogServices";
import RecentPosts from "@/components/RecentPosts";

export default async function Home() {
  const blogposts: BlogpostType[] = await getBlogposts();

  const topPosts = [...blogposts].sort((a, b) => b.views - a.views).slice(0, 6);

  const recentPosts = [...blogposts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className={styles["home-page"]}>
      <Hero />
      <RecentPosts blogposts={recentPosts} />
      <MainArea topPosts={topPosts} recentPosts={recentPosts} />
    </div>
  );
}
