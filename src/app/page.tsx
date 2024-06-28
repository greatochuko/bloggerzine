import Hero, { Blogpost } from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";
import { getBlogposts } from "@/services/blogServices";

export default async function Home() {
  const blogposts: Blogpost[] = await getBlogposts();

  return (
    <div className={styles["home-page"]}>
      <Hero blogposts={blogposts.slice(0, 4)} />
      <MainArea
        topPosts={blogposts.sort((a, b) => b.views - a.views).slice(0, 6)}
        recentPosts={blogposts
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6)}
      />
    </div>
  );
}
