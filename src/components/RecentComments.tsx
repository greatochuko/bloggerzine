"use client";
import React from "react";
import styles from "@/styles/RecentComments.module.css";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";
import { User } from "@/services/userServices";
import { CommentType } from "./Comment";

export default function RecentComments({ author }: { author: User }) {
  const authorId = author.id;
  const comments: CommentType[] = [];

  return (
    <div className={styles["recent-comments"]}>
      <div className={styles["header"]}>
        <h2>Recent Comments</h2>
      </div>
      {comments.length ? (
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
                    src={comment.user.imageUrl || ""}
                    alt={comment.user.firstname + " " + comment.user.lastname}
                    fill
                    sizes="80px"
                  ></Image>
                </div>
                <div className={styles["text"]}>
                  <p>{comment.comment}...</p>
                  <p>
                    by {comment.user.firstname + " " + comment.user.lastname}
                  </p>
                </div>
              </Link>
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
