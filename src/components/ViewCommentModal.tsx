import React from "react";
import styles from "@/styles/ViewCommentModal.module.css";
import { CommentType } from "./Comment";
import Image from "next/image";

export default function ViewCommentModal({
  isOpen,
  closeModal,
  comment,
}: {
  isOpen: boolean;
  closeModal: () => void;
  comment: CommentType | null;
}) {
  return (
    <div
      className={`${styles["overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={closeModal}
    >
      <div
        className={styles["view-comment-modal"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Comment</h2>
        <div className={styles["comment"]}>
          <div className={styles["image-container"]}>
            <Image
              src={comment ? comment.user.imageUrl : ""}
              alt={comment?.user.firstname + " " + comment?.user.lastname}
              fill
              sizes="64px"
            ></Image>
          </div>
          <div className={styles["details"]}>
            <h3>{comment?.user.firstname + " " + comment?.user.lastname}</h3>
            <p>
              {new Date(comment?.createdAt || "")
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>
            <p className={styles["content"]}>{comment?.comment}</p>
          </div>
        </div>
        <div className={styles["actions"]}>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}
