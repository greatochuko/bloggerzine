"use client";
import React, { useState } from "react";
import styles from "@/app/blog/[blogTitle]/page.module.css";
import { toggleLikePost } from "@/actions/blogActions";

export default function LikeSection({
  blogId,
  isLiked,
  authorId,
}: {
  authorId: string;
  blogId: string;
  isLiked: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    setLoading(true);
    await toggleLikePost(blogId, authorId);
    setLoading(false);
  }

  return (
    <div className={styles["like"]}>
      <p>Enjoyed this article?</p>
      <button
        className={isLiked ? styles["active"] : ""}
        onClick={handleLike}
        disabled={loading}
      >
        Yes
      </button>
    </div>
  );
}
