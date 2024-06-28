"use client";
import React, { useState } from "react";
import styles from "@/styles/Comment.module.css";
import Image from "next/image";
import ReplyForm from "./ReplyForm";
import { Blogpost } from "./Hero";
import { User } from "@/services/userServices";

export type CommentType = {
  id: number;
  blogpost: Blogpost;
  user: User;
  comment: string;
  createdAt: string;
  parentId: null | number;
};

export default function Comment({
  comment,
  comments,
  replyFormId,
  blogId,
  setReplyFormId,
}: {
  comment: CommentType;
  comments: CommentType[];
  replyFormId: number | null;
  blogId: string;
  setReplyFormId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const replies = comments.filter((c) => c.parentId === comment.id);

  return (
    <li className={styles["comment"]}>
      <div className={styles["main"]}>
        <div className={styles["image-container"]}>
          <Image
            src={comment.user.imageUrl || ""}
            alt={comment.user.firstname + " " + comment.user.lastname}
            fill
            sizes=""
          ></Image>
        </div>
        <div className={styles["details"]}>
          <h3>{comment.user.firstname + " " + comment.user.lastname}</h3>
          <time>
            {new Date(comment.createdAt)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </time>
          <p className={styles["content"]}>{comment.comment}</p>
          <button onClick={() => setReplyFormId(comment.id)}>Reply</button>
          {replyFormId === comment.id ? (
            <ReplyForm
              closeReplyForm={() => setReplyFormId(null)}
              blogId={blogId}
              parentId={comment.id}
            />
          ) : null}
        </div>
      </div>
      {replies.length ? (
        <ul className={styles["replies"]}>
          {replies.map((comment) => (
            <Comment
              blogId={blogId}
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
