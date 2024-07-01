"use client";
import React, { useState } from "react";
import styles from "@/app/blog/[blogTitle]/page.module.css";
import { toggleLikePost, toggleDislikePost } from "@/actions/blogActions";

export default function LikeSection({
  blogId,
  userId,
  isLiked,
  isDisliked,
}: {
  blogId: string;
  userId: string;
  isLiked: boolean;
  isDisliked: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    setLoading(true);
    await toggleLikePost(userId, blogId);
    setLoading(false);
  }

  async function handleDislike() {
    setLoading(true);
    await toggleDislikePost(userId, blogId);
    setLoading(false);
  }
  return (
    <div className={styles["like"]}>
      <p>Enjoyed this article?</p>
      <input type="hidden" name="blogId" defaultValue={blogId} />
      <input type="hidden" name="userId" defaultValue={userId} />
      <button
        className={isLiked ? styles["active"] : ""}
        onClick={handleLike}
        disabled={loading}
      >
        Yes
      </button>
      <button
        className={isDisliked ? styles["active"] : ""}
        disabled={loading}
        onClick={handleDislike}
      >
        No
      </button>
    </div>
  );
}
