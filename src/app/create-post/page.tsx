import React from "react";
import styles from "./page.module.css";
import { Metadata } from "next";
import PostForm from "@/components/PostForm";

export const metadata: Metadata = {
  title: "Create New Post",
};

export default async function CreatePostPage() {
  return (
    <div className={styles["create-new-post-page"]}>
      <h1>Create Post</h1>
      <PostForm />
    </div>
  );
}
