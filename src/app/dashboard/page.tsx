import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navigate from "@/components/Navigate";
import { getBlogpostByAuthor } from "@/services/blogServices";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) return <Navigate to="/login" />;

  let { data: authorBlogposts } = await getBlogpostByAuthor(data.user.id);

  return (
    <div className={styles["profile-page"]}>
      <Stats author={data.user} blogposts={authorBlogposts || []} />
      <div className={styles["main"]}>
        <AboutAuthor author={data.user} />
        <RecentComments author={data.user} />
        <ArticleList blogposts={authorBlogposts || []} />
      </div>
    </div>
  );
}
