import Hero from "@/components/Hero";
import styles from "./page.module.css";
import MainArea from "@/components/MainArea";
import { getBlogposts } from "@/services/blogServices";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const blogposts = getBlogposts();

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log(error?.message);

  return (
    <div className={styles["home-page"]}>
      <Hero blogposts={blogposts.slice(0, 4)} />
      {/* <MainArea
        topPosts={blogposts.slice(0, 6)}
        recentPosts={blogposts.slice(6, 10)}
      /> */}
    </div>
  );
}
