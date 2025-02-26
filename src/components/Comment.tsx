"use client";
import React from "react";
import styles from "@/styles/Comment.module.css";
import Image from "next/image";
import ReplyForm from "./ReplyForm";
import { BlogpostType } from "./Hero";
import { UserType } from "@/services/userServices";

export type CommentType = {
  id: number;
  blogpost: BlogpostType;
  user: UserType;
  comment: string;
  createdAt: string;
  parentId: null | number;
  rootCommentId: null | number;
};

export default function Comment({
  comment,
  comments,
  replyFormId,
  blogId,
  userId,
  setReplyFormId,
  setCommentToEdit,
  setCommentToDelete,
}: {
  comment: CommentType;
  comments: CommentType[];
  replyFormId: number | null;
  blogId: string;
  userId?: string;
  setReplyFormId: React.Dispatch<React.SetStateAction<number | null>>;
  setCommentToEdit: React.Dispatch<React.SetStateAction<CommentType | null>>;
  setCommentToDelete: React.Dispatch<React.SetStateAction<CommentType | null>>;
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
            <div className={styles["actions"]}>
              {comment.user.id === userId ? (
                <>
                  <button onClick={() => setCommentToEdit(comment)}>
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
                        <path
                          d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                          stroke="#333  "
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21 21H12"
                          stroke="#333  "
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </button>
                  <button onClick={() => setCommentToDelete(comment)}>
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
                        <path
                          d="M10 12V17"
                          stroke="#e32636"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M14 12V17"
                          stroke="#e32636"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M4 7H20"
                          stroke="#e32636"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                          stroke="#e32636"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                          stroke="#e32636"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          </time>
          <p className={styles["content"]}>{comment.comment}</p>

          {userId ? (
            <button onClick={() => setReplyFormId(comment.id)}>Reply</button>
          ) : null}
          {replyFormId === comment.id ? (
            <ReplyForm
              closeReplyForm={() => setReplyFormId(null)}
              blogId={blogId}
              rootCommentId={comment.rootCommentId || comment.id}
              parentId={comment.id}
            />
          ) : null}
        </div>
      </div>
      {replies.length ? (
        <ul className={styles["replies"]}>
          {replies.map((comment) => (
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
      ) : null}
    </li>
  );
}
