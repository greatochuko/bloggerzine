"use client";
import React, { useState } from "react";
import Comment, { CommentType } from "./Comment";
import styles from "@/styles/CommentSection.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { postComment } from "@/actions/commentActions";
import LoadingIndicator from "./LoadingIndicator";

export default function CommentSection({
  comments,
  blogId,
}: {
  comments: CommentType[];
  blogId: string;
}) {
  const [comment, setComment] = useState("");
  const [replyFormId, setReplyFormId] = useState<number | null>(null);
  function handlePostComment(e: React.FormEvent) {
    e.preventDefault();
  }

  const [state, postCommentAction] = useFormState(postComment, {
    errorMessage: "",
  });

  const { errorMessage } = state;

  return (
    <section className={styles["comment-section"]}>
      <h2>
        {comments.length} Comment{comments.length > 1 ? "s" : ""}
      </h2>
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
      <form className={styles["comment-form"]} action={postCommentAction}>
        <h2>Leave a Comment</h2>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
        ></textarea>
        <input type="hidden" name="blogpost" hidden defaultValue={blogId} />
        {errorMessage ? (
          <p className={styles["error"]}>{errorMessage}</p>
        ) : null}
        <Button />
      </form>
    </section>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? (
        <>
          <LoadingIndicator size={20} color="white" /> Posting...
        </>
      ) : (
        "Post Comment"
      )}
    </button>
  );
}
