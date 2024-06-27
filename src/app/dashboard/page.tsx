import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import Navigate from "@/components/Navigate";
import { getBlogpostByAuthor } from "@/services/blogServices";
import { getUser } from "@/services/userServices";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) return <Navigate to="/login" />;

  const { user } = await getUser(data.user.id);

  if (!user) notFound();

  let authorBlogposts = await getBlogpostByAuthor(data.user.id);

  return (
    <div className={styles["profile-page"]}>
      <Stats author={user} blogposts={authorBlogposts || []} />
      <div className={styles["main"]}>
        <AboutAuthor author={user} />
        <RecentComments author={user} />
        <ArticleList blogposts={authorBlogposts || []} />
      </div>
    </div>
  );
}
