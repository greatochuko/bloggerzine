import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import {
  getBlogpostByAuthor,
  getLikedBlogposts,
} from "@/services/blogServices";
import { getSession } from "@/services/userServices";
import { redirect } from "next/navigation";
import { getCommentsByAuthor } from "@/services/commentServices";
import { BlogpostType, CommentType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const user = await getSession();

  if (!user) redirect("/login?redirect=/dashboard");

  const authorBlogposts: BlogpostType[] = await getBlogpostByAuthor(
    user.id,
    true
  );
  const authorComments: CommentType[] = await getCommentsByAuthor(user.id);
  const authorLikes = await getLikedBlogposts();

  return (
    <div className={styles["profile-page"]}>
      <Stats
        comments={authorComments}
        blogposts={authorBlogposts}
        likes={authorLikes.length}
      />
      <div className={styles["main"]}>
        <AboutAuthor author={user} blogposts={authorBlogposts} />
        <RecentComments comments={authorComments} />
        <ArticleList blogposts={authorBlogposts} />
      </div>
    </div>
  );
}
