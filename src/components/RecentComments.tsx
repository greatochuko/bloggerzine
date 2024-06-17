import React from "react";
import styles from "@/styles/RecentComments.module.css";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";
import { getCommentsByAuthor } from "@/services/commentServices";

export default function RecentComments({ authorId }: { authorId: string }) {
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
                  src={comment.user.imageUrl}
                  alt={comment.user.fullname}
                  fill
                  sizes="80px"
                ></Image>
              </div>
              <div className={styles["text"]}>
                <p>{comment.comment}...</p>
                <p>by {comment.user.fullname}</p>
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
