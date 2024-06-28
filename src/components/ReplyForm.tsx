"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ReplyForm.module.css";
import { postReply } from "@/actions/commentActions";
import { useFormState, useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function ReplyForm({
  parentId,
  blogId,
  closeReplyForm,
}: {
  parentId: number;
  blogId: string;
  closeReplyForm: () => void;
}) {
  const [reply, SetReply] = useState("");

  const [state, postReplyAction] = useFormState(postReply, {
    done: false,
    errorMessage: "",
  });

  const { done, errorMessage } = state;

  useEffect(() => {
    if (done) {
      closeReplyForm();
    }
  }, [done]);

  return (
    <form className={styles["reply-form"]} action={postReplyAction}>
      <h2>Reply to comment</h2>
      <textarea
        name="reply"
        id="reply"
        value={reply}
        onChange={(e) => SetReply(e.target.value)}
        placeholder="Reply..."
      ></textarea>
      <input type="hidden" name="blogpost" hidden defaultValue={blogId} />
      <input type="hidden" name="parentId" hidden defaultValue={parentId} />

      {errorMessage ? <p className={styles["error"]}>{errorMessage}</p> : null}
      <div className={styles["actions"]}>
        <button onClick={closeReplyForm}>Close</button>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? (
        <>
          <LoadingIndicator size={20} color="white" /> Replying...
        </>
      ) : (
        "Post Reply"
      )}
    </button>
  );
}
