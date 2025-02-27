"use client";
import React from "react";
import styles from "@/styles/Comment.module.css";
import Image from "next/image";
import ReplyForm from "./ReplyForm";
import { BlogpostType } from "./Hero";
import { UserType } from "@/services/userServices";
import { PencilIcon, Trash2Icon } from "lucide-react";

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
                    <PencilIcon width={16} height={16} />
                  </button>
                  <button onClick={() => setCommentToDelete(comment)}>
                    <Trash2Icon width={16} height={16} />
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
