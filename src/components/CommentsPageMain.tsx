"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import paginatorStyles from "@/styles/Paginator.module.css";
import { CommentType } from "./Comment";
import styles from "@/app/comments/page.module.css";

export default function CommentsPageMain({
  comments,
}: {
  comments: CommentType[];
}) {
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
    <div className={styles["main"]}>
      <table>
        <thead>
          <tr>
            <th>Blog Title</th>
            <th>User</th>
            <th>Comment</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map((comment) => (
            <tr key={comment.id}>
              <td>
                <Link
                  href={`/blog/${convertToUrl(comment.blogpost.title)}_${
                    comment.blogpost.id
                  }`}
                >
                  {comment.blogpost.title}
                </Link>
              </td>
              <td>
                <Link href={`/authors/${createAuthorUrl(comment.user)}`}>
                  {comment.user.firstname + " " + comment.user.lastname}
                </Link>
              </td>
              <td>{comment.comment}</td>
              <td>
                {new Date(comment.createdAt)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </td>
              <td>
                <button>
                  <svg
                    height={20}
                    width={20}
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
                        d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                        fill="#333"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                        fill="#333"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
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
                  src={comment.user.imageUrl || ""}
                  alt={comment.user.firstname + " " + comment.user.lastname}
                  fill
                  sizes=""
                ></Image>
              </div>
              <div className={styles["text"]}>
                <h4>{comment.user.firstname + " " + comment.user.lastname}</h4>
                <p>
                  {new Date(comment.createdAt)
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </p>
              </div>
            </div>
            <p>
              <span>Blog Title: </span>
              {comment.blogpost.title}
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
              className={page === currentPage ? paginatorStyles["active"] : ""}
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
  );
}
