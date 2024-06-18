import React from "react";
import styles from "./page.module.css";
import { getUserDashboard } from "@/services/userServices";
import Navigate from "@/components/Navigate";
import { Metadata } from "next";
import PostForm from "@/components/PostForm";

export const metadata: Metadata = {
  title: "Create New Post",
};

export default function CreatePostPage() {
  const user = getUserDashboard();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className={styles["create-new-post-page"]}>
      <h1>Create Post</h1>
      <PostForm />
    </div>
  );
}
