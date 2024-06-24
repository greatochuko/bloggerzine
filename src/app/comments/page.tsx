"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import paginatorStyles from "@/styles/Paginator.module.css";
import { getUserComments } from "@/services/commentServices";
import Image from "next/image";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";

export default function CommentsPage() {
  const comments = getUserComments();
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = comments.length > 10 ? 10 : comments.length;
  const maxPage = Math.ceil(comments.length / postPerPage) || 1;
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  const paginatedComments = comments.slice(
    (currentPage - 1) * 5,
    (currentPage - 1) * 5 + 5
  );

  function gotoNextPage() {
    if (currentPage >= maxPage) return;
    setCurrentPage((curr) => curr + 1);
  }

  function gotoPrevPage() {
    if (currentPage <= 1) return;
    setCurrentPage((curr) => curr - 1);
  }

  return (
    <div className={styles["comments-page"]}>
      <h2>
        Comments <span>{comments.length}</span>
      </h2>
      <div className={styles["main"]}>
        <table>
          <thead>
            <tr>
              <th>Blog Title</th>
              <th>User</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComments.map((comment) => (
              <tr key={comment.id}>
                <td>
                  <Link
                    href={`/blog/${convertToUrl(comment.blog.title)}-${
                      comment.blog.id
                    }`}
                  >
                    {comment.blog.title}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/authors/${convertToUrl(
                      comment.user.user_metadata.username
                    )}`}
                  >
                    {comment.user.user_metadata.firstname +
                      " " +
                      comment.user.user_metadata.lastname}
                  </Link>
                </td>
                <td>{comment.comment}</td>
                <td>
                  {new Date(comment.dateCreated)
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul>
          {paginatedComments.map((comment) => (
            <li key={comment.id}>
              <div className={styles["user-info"]}>
                <div className={styles["image-container"]}>
                  <Image
                    src={comment.user.user_metadata.imageUrl}
                    alt={
                      comment.user.user_metadata.firstname +
                      " " +
                      comment.user.user_metadata.lastname
                    }
                    fill
                    sizes=""
                  ></Image>
                </div>
                <div className={styles["text"]}>
                  <h4>
                    {comment.user.user_metadata.firstname +
                      " " +
                      comment.user.user_metadata.lastname}
                  </h4>
                  <p>
                    {new Date(comment.dateCreated)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </p>
                </div>
              </div>
              <p>
                <span>Blog Title: </span>
                {comment.blog.title}
              </p>
              <p>
                <span>Comment: </span>
                {comment.comment}
              </p>
            </li>
          ))}
        </ul>
        <div className={styles["footer"]}>
          <p>
            Showing {(currentPage - 1) * postPerPage + 1}-
            {currentPage === pages.at(-1)
              ? comments.length
              : (currentPage - 1) * postPerPage + postPerPage}{" "}
            of {comments.length} entries
          </p>
          <div className={paginatorStyles["paginator"]}>
            <button disabled={currentPage <= 1} onClick={gotoPrevPage}>
              Prev
            </button>

            {pages.map((page) => (
              <button
                key={page}
                className={
                  page === currentPage ? paginatorStyles["active"] : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage >= pages[pages.length - 1]}
              onClick={gotoNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
