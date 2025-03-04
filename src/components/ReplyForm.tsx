"use client";
import React, { useState } from "react";
import styles from "@/styles/ReplyForm.module.css";
import { postReply } from "@/actions/commentActions";
import LoadingIndicator from "./LoadingIndicator";

export default function ReplyForm({
  parentId,
  blogId,
  rootCommentId,
  closeReplyForm,
}: {
  parentId: number;
  blogId: string;
  rootCommentId: number;
  closeReplyForm: () => void;
}) {
  const [reply, setReply] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handlePostReply(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const { errorMessage } = await postReply(
      new FormData(e.target as HTMLFormElement)
    );
    errorMessage ? setError(errorMessage) : closeReplyForm();
    setPending(false);
  }

  return (
    <form className={styles["reply-form"]} onSubmit={handlePostReply}>
      <h2>Reply to comment</h2>
      <textarea
        name="reply"
        id="reply"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Reply..."
      ></textarea>

      <input type="hidden" name="blogpost" hidden defaultValue={blogId} />
      <input type="hidden" name="parentId" hidden defaultValue={parentId} />
      <input
        type="hidden"
        name="rootCommentId"
        hidden
        defaultValue={rootCommentId}
      />

      {error ? <p className={styles["error"]}>{error}</p> : null}
      <div className={styles["actions"]}>
        <button onClick={closeReplyForm}>Close</button>
        <button disabled={pending} type="submit">
          {pending ? (
            <>
              <LoadingIndicator size={20} color="white" /> Replying...
            </>
          ) : (
            "Post Reply"
          )}
        </button>
      </div>
    </form>
  );
}
