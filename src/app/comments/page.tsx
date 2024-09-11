import React, { useState } from "react";
import styles from "./page.module.css";
import { getCommentsByAuthor } from "@/services/commentServices";
import CommentsPageMain from "@/components/CommentsPageMain";
import { getSession } from "@/services/userServices";

export default async function CommentsPage() {
  const user = await getSession()
  const comments = await getCommentsByAuthor(user!.id);

  return (
    <div className={styles["comments-page"]}>
      <h2>
        Comments <span>{comments.length}</span>
      </h2>
      <CommentsPageMain comments={comments} />
    </div>
  );
}
