import React from "react";
import styles from "@/styles/RecentComments.module.css";
import { comments } from "@/app/blog/[blogTitle]/page";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";

export default function RecentComments() {
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
                  src={comment.user.imageUrl}
                  alt={comment.user.name}
                  fill
                  sizes=""
                ></Image>
              </div>
              <div className={styles["text"]}>
                <p>{comment.comment}...</p>
                <p>by {comment.user.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
