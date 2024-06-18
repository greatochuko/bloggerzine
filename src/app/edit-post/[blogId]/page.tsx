import React from "react";
import styles from "./page.module.css";
import { getUserDashboard } from "@/services/userServices";
import Navigate from "@/components/Navigate";
import { Metadata } from "next";
import PostForm from "@/components/PostForm";
import { getBlogpost } from "@/services/blogServices";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Post",
};

export default function EditPostPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blogpostId = params.blogId.split("-").at(-1);
  if (!blogpostId) notFound();

  const blogpost = getBlogpost(blogpostId);
  if (!blogpost) notFound();

  const user = getUserDashboard();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className={styles["edit-post-page"]}>
      <h1>Edit Post</h1>
      <PostForm blogpost={blogpost} />
    </div>
  );
}
