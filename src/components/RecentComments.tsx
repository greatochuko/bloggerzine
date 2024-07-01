"use client";
import React from "react";
import styles from "@/styles/RecentComments.module.css";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";
import { CommentType } from "./Comment";
import { createAuthorUrl } from "@/utils/createAuthorUrl";

export default function RecentComments({
  comments,
}: {
  comments: CommentType[];
}) {
  return (
    <div className={styles["recent-comments"]}>
      <div className={styles["header"]}>
        <h2>Recent Comments</h2>
      </div>
      {comments.length ? (
        <ul className={styles["main"]}>
          {comments.map((comment) => (
            <li className={styles["recent-comment"]} key={comment.id}>
              <div className={styles["image-container"]}>
                <Image
                  src={comment.user.imageUrl || ""}
                  alt={comment.user.firstname + " " + comment.user.lastname}
                  fill
                  sizes="80px"
                ></Image>
              </div>
              <div className={styles["text"]}>
                <Link
                  href={`/blog/${convertToUrl(comment.blogpost.title)}_${
                    comment.blogpost.id
                  }`}
                  className={styles["comment-content"]}
                >
                  {comment.comment}
                </Link>
                <p>
                  by{" "}
                  <Link href={createAuthorUrl(comment.user)}>
                    {comment.user.firstname + " " + comment.user.lastname}
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles["no-comments"]}>You Currently have no comments</p>
      )}
      {comments.length ? (
        <div className={styles["footer"]}>
          <Link href={"/comments"}>View all comments</Link>
        </div>
      ) : null}
    </div>
  );
}
