"use client";
import React, { useState } from "react";
import styles from "@/styles/Comment.module.css";
import Image from "next/image";
import ReplyForm from "./ReplyForm";

export type CommentType = {
  id: number;
  user: {
    fullname: string;
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
  replyFormId,
  setReplyFormId,
}: {
  comment: CommentType;
  comments: CommentType[];
  replyFormId: number | null;
  setReplyFormId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const replies = comments.filter((c) => c.parentId === comment.id);

  return (
    <li className={styles["comment"]}>
      <div className={styles["main"]}>
        <div className={styles["image-container"]}>
          <Image
            src={comment.user.imageUrl}
            alt={comment.user.fullname}
            fill
            sizes=""
          ></Image>
        </div>
        <div className={styles["details"]}>
          <h3>{comment.user.fullname}</h3>
          <time>
            {new Date(comment.dateCreated)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </time>
          <p className={styles["content"]}>{comment.comment}</p>
          <button onClick={() => setReplyFormId(comment.id)}>Reply</button>
          {replyFormId === comment.id ? (
            <ReplyForm close={() => setReplyFormId(null)} />
          ) : null}
        </div>
      </div>
      {replies.length ? (
        <ul className={styles["replies"]}>
          {replies.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              comments={comments}
              replyFormId={replyFormId}
              setReplyFormId={setReplyFormId}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
