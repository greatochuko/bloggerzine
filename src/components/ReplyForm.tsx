"use client";
import React, { useState } from "react";
import styles from "@/styles/ReplyForm.module.css";

export default function ReplyForm({ close }: { close: () => void }) {
  const [reply, SetReply] = useState("");

  function handlePostReply(e: React.FormEvent) {
    e.preventDefault();
    close();
  }

  return (
    <form className={styles["reply-form"]} onSubmit={handlePostReply}>
      <h2>Reply to comment</h2>
      <textarea
        name="reply"
        id="reply"
        value={reply}
        onChange={(e) => SetReply(e.target.value)}
        placeholder="Reply..."
      ></textarea>
      <div className={styles["actions"]}>
        <button onClick={close}>Close</button>
        <button type="submit">Post Reply</button>
      </div>
    </form>
  );
}
