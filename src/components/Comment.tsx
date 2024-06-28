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
  userId,
  setReplyFormId,
  editCommentModal,
  setEditCommentModal,
}: {
  comment: CommentType;
  comments: CommentType[];
  replyFormId: number | null;
  blogId: string;
  userId?: string;
  setReplyFormId: React.Dispatch<React.SetStateAction<number | null>>;
  editCommentModal: CommentType | null;
  setEditCommentModal: React.Dispatch<React.SetStateAction<CommentType | null>>;
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
          <div className={styles["actions"]}>
            {comment.user.id === userId ? (
              <button
                onClick={() =>
                  setEditCommentModal((curr) =>
                    curr?.id === comment.id ? null : comment
                  )
                }
              >
                <svg
                  height={16}
                  width={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                      stroke="#333  "
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M21 21H12"
                      stroke="#333  "
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                Edit
              </button>
            ) : null}
            <button onClick={() => setReplyFormId(comment.id)}>Reply</button>
          </div>
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
              editCommentModal={editCommentModal}
              setEditCommentModal={setEditCommentModal}
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
      ) : null}
    </li>
  );
}
