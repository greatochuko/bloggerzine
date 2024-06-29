"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/ArticleList.module.css";
import paginatorStyles from "@/styles/Paginator.module.css";
import { categories } from "@/app/categories/page2";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";
import { Blogpost } from "./Hero";
import DeletePostModal from "./DeletePostModal";

export default function ArticleList({ blogposts }: { blogposts: Blogpost[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("all");
  const [deletePostModal, setDeletePostModal] = useState<{
    open: boolean;
    post: Blogpost | null;
  }>({
    open: false,
    post: null,
  });
  const [optionOpen, setOptionOpen] = useState<string | null>(null);

  let filteredPosts = blogposts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery)
  );

  // Filter posts
  if (filter === "draft")
    filteredPosts = filteredPosts.filter((post) => !post.isPublished);
  if (filter === "published")
    filteredPosts = filteredPosts.filter((post) => post.isPublished);

  // Sort posts
  switch (sortBy) {
    case "lowest-views":
      filteredPosts = [...filteredPosts].sort((a, b) => a.views - b.views);
      break;

    case "highest-views":
      filteredPosts = [...filteredPosts].sort((a, b) => b.views - a.views);
      break;

    case "newest":
      filteredPosts = [...filteredPosts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;

    case "oldest":
      filteredPosts = [...filteredPosts].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;

    default:
      break;
  }

  const postPerPage = filteredPosts.length > 5 ? 5 : filteredPosts.length;
  const maxPage = Math.ceil(filteredPosts.length / postPerPage) || 1;
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  const paginatedPosts = filteredPosts.slice(
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
    <>
      <div className={styles["article-list"]}>
        <div className={styles["header"]}>
          <h2>Blog Posts</h2>
          <Link href={"/create-post"}>Add New</Link>
        </div>
        <div className={styles["main"]}>
          {blogposts.length ? (
            <>
              <div className={styles["main-header"]}>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  name="sort"
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="lowest-views">Lowest Views</option>
                  <option value="highest-views">Highest Views</option>
                </select>
                <select
                  name="filter"
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Filter</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Blog Title</th>
                    <th>Date</th>
                    <th>Total Views</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.map((blogpost) => (
                    <tr key={blogpost._id}>
                      <td>
                        <Link
                          href={`/blog/${convertToUrl(blogpost.title)}_${
                            blogpost._id
                          }`}
                        >
                          {blogpost.title}
                        </Link>
                      </td>
                      <td>
                        {new Date(blogpost.createdAt)
                          .toDateString()
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </td>
                      <td>{blogpost.views}</td>
                      <td className={styles["category"]}>
                        <Link
                          href={`/categories/${blogpost.category}`}
                          style={{
                            backgroundColor: categories.find(
                              (cat) =>
                                cat.name.toLowerCase() ===
                                blogpost.category.toLowerCase()
                            )?.color,
                          }}
                        >
                          {blogpost.category}
                        </Link>
                      </td>
                      <td
                        className={`
                        ${styles["status"]} ${
                          blogpost.isPublished
                            ? styles["published"]
                            : styles["draft"]
                        }`}
                      >
                        <p>{blogpost.isPublished ? "published" : "draft"}</p>
                      </td>
                      <td className={styles["actions"]}>
                        <Link
                          href={`/edit-post/${convertToUrl(blogpost.title)}_${
                            blogpost._id
                          }`}
                        >
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
                              <path
                                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                stroke="#000000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                stroke="#000000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                          </svg>
                        </Link>
                        <button
                          onClick={() =>
                            setDeletePostModal({ open: true, post: blogpost })
                          }
                        >
                          <svg
                            width={20}
                            height={20}
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
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M14 12V17"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M4 7H20"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul>
                {paginatedPosts.map((blogpost) => (
                  <li className={styles["blog-card"]} key={blogpost._id}>
                    <div className={styles["image-container"]}>
                      <Image
                        src={blogpost.thumbnail || ""}
                        alt={blogpost.title}
                        fill
                        sizes="128px"
                      ></Image>
                    </div>
                    <div className={styles["text"]}>
                      <p>
                        <span>Title:</span>
                        <Link
                          href={`/blog/${convertToUrl(blogpost.title)}_${
                            blogpost._id
                          }`}
                        >
                          {blogpost.title}
                        </Link>
                      </p>
                      <p>
                        <span>Date Created:</span>
                        {new Date(blogpost.createdAt)
                          .toDateString()
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </p>
                      <p>
                        <span>Views:</span>
                        {blogpost.views}
                      </p>
                      <p>
                        <span>Category:</span>
                        {blogpost.category}
                      </p>
                      <p>
                        <span>Status:</span>
                        {blogpost.isPublished ? "published" : "draft"}
                      </p>
                    </div>
                    <div className={styles["options"]}>
                      <button
                        className={styles["options-button"]}
                        onClick={() => {
                          if (optionOpen === blogpost._id) {
                            setOptionOpen(null);
                          } else {
                            setOptionOpen(blogpost._id);
                          }
                        }}
                      >
                        <svg
                          height={20}
                          width={20}
                          fill="#000000"
                          viewBox="0 0 32 32"
                          version="1.1"
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
                            <path d="M12.15 28.012v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.788 1.762-3.2 3.506-3.319 1.95-0.137 3.6 0.975 4.137 2.787 0.069 0.238 0.119 0.488 0.181 0.731v0.85c-0.019 0.056-0.050 0.106-0.056 0.169-0.269 1.65-1.456 2.906-3.081 3.262-0.125 0.025-0.25 0.063-0.375 0.094h-0.85c-0.056-0.019-0.113-0.050-0.169-0.056-1.625-0.262-2.862-1.419-3.237-3.025-0.037-0.156-0.081-0.3-0.119-0.444zM20.038 3.988l-0 0.85c-0.019 0.069-0.050 0.131-0.056 0.2-0.281 1.8-1.775 3.206-3.538 3.319-1.944 0.125-3.588-1-4.119-2.819-0.069-0.231-0.119-0.469-0.175-0.7v-0.85c0.019-0.056 0.050-0.106 0.063-0.162 0.3-1.625 1.244-2.688 2.819-3.194 0.206-0.069 0.425-0.106 0.637-0.162h0.85c0.056 0.019 0.113 0.050 0.169 0.056 1.631 0.269 2.863 1.419 3.238 3.025 0.038 0.15 0.075 0.294 0.113 0.437zM20.037 15.575v0.85c-0.019 0.069-0.050 0.131-0.063 0.2-0.281 1.794-1.831 3.238-3.581 3.313-1.969 0.087-3.637-1.1-4.106-2.931-0.050-0.194-0.094-0.387-0.137-0.581v-0.85c0.019-0.069 0.050-0.131 0.063-0.2 0.275-1.794 1.831-3.238 3.581-3.319 1.969-0.094 3.637 1.1 4.106 2.931 0.050 0.2 0.094 0.394 0.137 0.588z"></path>{" "}
                          </g>
                        </svg>
                      </button>
                      {optionOpen === blogpost._id ? (
                        <div className={styles["options-list"]}>
                          <Link
                            href={`/edit-post/${convertToUrl(blogpost.title)}_${
                              blogpost._id
                            }`}
                          >
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
                                <path
                                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </g>
                            </svg>
                            Update
                          </Link>
                          <button
                            onClick={() =>
                              setDeletePostModal({ open: true, post: blogpost })
                            }
                          >
                            <svg
                              width={20}
                              height={20}
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
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M14 12V17"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M4 7H20"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                  stroke="#000000"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </g>
                            </svg>{" "}
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className={styles["no-blogposts"]}>
              You have not published any blogposts yet
            </p>
          )}
        </div>
        {blogposts.length ? (
          <div className={styles["footer"]}>
            <p>
              Showing {(currentPage - 1) * postPerPage + 1}-
              {currentPage === pages.at(-1)
                ? filteredPosts.length
                : (currentPage - 1) * postPerPage + postPerPage}{" "}
              of {filteredPosts.length} entries
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
        ) : null}
      </div>
      <DeletePostModal
        isOpen={deletePostModal.open}
        closeModal={() => setDeletePostModal({ post: null, open: false })}
        post={deletePostModal.post}
      />
    </>
  );
}
