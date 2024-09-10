import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { getBlogpostByAuthor } from "@/services/blogServices";
import { getSession } from "@/services/userServices";
import { notFound } from "next/navigation";
import { getCommentsByAuthor } from "@/services/commentServices";
import { BlogpostType } from "@/components/Hero";
import { CommentType } from "@/components/Comment";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const supabase = createClient();
  const user = await getSession();

  if (!user) notFound();

  const authorBlogposts: BlogpostType[] = await getBlogpostByAuthor(
    user.id,
    true
  );
  const authorComments: CommentType[] = await getCommentsByAuthor(user.id);

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
