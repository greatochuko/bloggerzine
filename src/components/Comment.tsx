"use client";
import React, { useState } from "react";
import styles from "@/styles/Comment.module.css";
import Image from "next/image";
import ReplyForm from "./ReplyForm";

export type CommentType = {
  id: number;
  user: {
    name: string;
    imageUrl: string;
    id: number;
  };
  comment: string;
  dateCreated: string;
  parentId: null | number;
};

export default function Comment({
  comment,
  comments,
  isReply,
  replyFormId,
  setReplyFormId,
}: {
  comment: CommentType;
  comments: CommentType[];
  isReply?: boolean;
  replyFormId: number | null;
  setReplyFormId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const replies = comments.filter((c) => c.parentId === comment.id);

  return (
    <li className={`${styles["comment"]} ${isReply ? styles["reply"] : ""}`}>
      <div className={styles["image-container"]}>
        <Image
          src={comment.user.imageUrl}
          alt={comment.user.name}
          fill
          sizes=""
        ></Image>
      </div>
      <div className={styles["details"]}>
        <h3>{comment.user.name}</h3>
        <time>{comment.dateCreated}</time>
        <p className={styles["content"]}>{comment.comment}</p>
        <button onClick={() => setReplyFormId(comment.id)}>Reply</button>
        {replyFormId === comment.id ? (
          <ReplyForm close={() => setReplyFormId(null)} />
        ) : null}
        {/* {replies.length ? (
          <ul className={styles["replies"]}>
            {replies.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                comments={comments}
                isReply
                replyFormId={replyFormId}
                setReplyFormId={setReplyFormId}
              />
            ))}
          </ul>
        ) : null} */}
      </div>
    </li>
  );
}
