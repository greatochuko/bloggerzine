import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { getBlogpostByAuthor } from "@/services/blogServices";
import { getUser } from "@/services/userServices";
import { notFound } from "next/navigation";
import { getCommentsByAuthor } from "@/services/commentServices";
import { Blogpost } from "@/components/Hero";
import { CommentType } from "@/components/Comment";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  const { user } = await getUser(userId as string);

  if (!user) notFound();

  const authorBlogposts: Blogpost[] = await getBlogpostByAuthor(
    userId as string,
    true
  );
  const authorComments: CommentType[] = await getCommentsByAuthor(
    userId as string
  );

  return (
    <div className={styles["profile-page"]}>
      <Stats comments={authorComments} blogposts={authorBlogposts} />
      <div className={styles["main"]}>
        <AboutAuthor author={user} blogposts={authorBlogposts} />
        <RecentComments comments={authorComments} />
        <ArticleList blogposts={authorBlogposts} />
      </div>
    </div>
  );
}
