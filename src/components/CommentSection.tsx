"use client";
import React, { useState } from "react";
import Comment, { CommentType } from "./Comment";
import styles from "@/styles/CommentSection.module.css";

export default function CommentSection({
  comments,
}: {
  comments: CommentType[];
}) {
  const [comment, setComment] = useState("");
  const [replyFormId, setReplyFormId] = useState<number | null>(null);
  function handlePostComment(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className={styles["comment-section"]}>
      <h2>{comments.length} Comments</h2>
      <ul className={styles["comment-list"]}>
        {comments
          .filter((c) => !c.parentId)
          .map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              comments={comments}
              replyFormId={replyFormId}
              setReplyFormId={setReplyFormId}
            />
          ))}
      </ul>
      <form className={styles["comment-form"]} onSubmit={handlePostComment}>
        <h2>Leave a Comment</h2>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </section>
  );
}
