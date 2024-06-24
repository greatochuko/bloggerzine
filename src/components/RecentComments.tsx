"use client";
import React from "react";
import styles from "@/styles/RecentComments.module.css";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";
import { getCommentsByAuthor } from "@/services/commentServices";
import { useUserContext } from "@/context/UserContext";
import Navigate from "./Navigate";

export default function RecentComments() {
  const { user } = useUserContext();

  const authorId = user?.id.toString() as string;
  const comments = getCommentsByAuthor(authorId);

  return (
    <div className={styles["recent-comments"]}>
      <div className={styles["header"]}>
        <h2>Recent Comments</h2>
      </div>
      <ul className={styles["main"]}>
        {comments.map((comment) => (
          <li className={styles["recent-comment"]} key={comment.id}>
            <Link
              href={`/blog/${convertToUrl(comment.blog.title)}-${
                comment.blog.id
              }`}
            >
              <div className={styles["image-container"]}>
                <Image
                  src={comment.user.user_metadata.imageUrl}
                  alt={
                    comment.user.user_metadata.firstname +
                    " " +
                    comment.user.user_metadata.lastname
                  }
                  fill
                  sizes="80px"
                ></Image>
              </div>
              <div className={styles["text"]}>
                <p>{comment.comment}...</p>
                <p>
                  by{" "}
                  {comment.user.user_metadata.firstname +
                    " " +
                    comment.user.user_metadata.lastname}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles["footer"]}>
        <Link href={"/comments"}>View all comments</Link>
      </div>
    </div>
  );
}
