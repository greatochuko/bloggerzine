import Hero from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";
import { getBlogposts } from "@/services/blogServices";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/userServices";

export default async function Home() {
  const blogposts = getBlogposts();

  return (
    <div className={styles["home-page"]}>
      <Hero blogposts={blogposts.slice(0, 4)} />
      <MainArea
        topPosts={blogposts.slice(0, 6)}
        recentPosts={blogposts.slice(6, 10)}
      />
    </div>
  );
}
