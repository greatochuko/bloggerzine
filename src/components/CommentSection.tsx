"use client";
import React, { useState } from "react";
import Comment, { CommentType } from "./Comment";
import styles from "@/styles/CommentSection.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { postComment } from "@/actions/commentActions";
import LoadingIndicator from "./LoadingIndicator";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

export default function CommentSection({
  comments,
  blogId,
  userId,
}: {
  comments: CommentType[];
  blogId: string;
  userId?: string;
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

  const [commentToEdit, setCommentToEdit] = useState<CommentType | null>(null);

  const [commentToDelete, setCommentToDelete] = useState<CommentType | null>(
    null
  );

  return (
    <>
      <section className={styles["comment-section"]}>
        <h2>
          {comments.length} Comment{comments.length > 1 ? "s" : ""}
        </h2>
        <ul className={styles["comment-list"]}>
          {comments
            .filter((c) => !c.parentId)
            .map((comment) => (
              <Comment
                setCommentToDelete={setCommentToDelete}
                setCommentToEdit={setCommentToEdit}
                userId={userId}
                blogId={blogId}
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
      <EditCommentModal
        comment={commentToEdit}
        isOpen={!!commentToEdit}
        closeModal={() => setCommentToEdit(null)}
      />
      <DeleteCommentModal
        comment={commentToDelete}
        isOpen={!!commentToDelete}
        closeModal={() => setCommentToDelete(null)}
      />
    </>
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
