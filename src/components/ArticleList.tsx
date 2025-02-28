"use client";
import React, { useCallback, useState } from "react";
import styles from "@/styles/ArticleList.module.css";
import paginatorStyles from "@/styles/Paginator.module.css";
import Link from "next/link";
import convertToUrl from "@/utils/convertToUrl";
import Image from "next/image";
import DeletePostModal from "./DeletePostModal";
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { categories } from "@/lib/data";
import { BlogpostType } from "@/lib/types";

export default function ArticleList({
  blogposts,
}: {
  blogposts: BlogpostType[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("all");
  const [deletePostModal, setDeletePostModal] = useState<{
    open: boolean;
    post: BlogpostType | null;
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
  const closeModal = useCallback(
    () => setDeletePostModal({ post: null, open: false }),
    []
  );

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
                    <th>Views</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.map((blogpost) => (
                    <tr key={blogpost.id}>
                      <td>
                        <Link
                          href={`/blog/${convertToUrl(blogpost.title)}_${
                            blogpost.id
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
                            blogpost.id
                          }`}
                        >
                          <PencilIcon width={18} height={18} />
                        </Link>
                        <button
                          onClick={() =>
                            setDeletePostModal({ open: true, post: blogpost })
                          }
                        >
                          <Trash2Icon width={18} height={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul>
                {paginatedPosts.map((blogpost) => (
                  <li className={styles["blog-card"]} key={blogpost.id}>
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
                            blogpost.id
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
                          if (optionOpen === blogpost.id) {
                            setOptionOpen(null);
                          } else {
                            setOptionOpen(blogpost.id);
                          }
                        }}
                      >
                        <EllipsisVerticalIcon width={20} height={20} />
                      </button>
                      {optionOpen === blogpost.id ? (
                        <div className={styles["options-list"]}>
                          <Link
                            href={`/edit-post/${convertToUrl(blogpost.title)}_${
                              blogpost.id
                            }`}
                          >
                            <PencilIcon width={16} height={16} />
                            Update
                          </Link>
                          {/* <hr /> */}
                          <button
                            onClick={() =>
                              setDeletePostModal({ open: true, post: blogpost })
                            }
                          >
                            <Trash2Icon width={16} height={16} />
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
        closeModal={closeModal}
        post={deletePostModal.post}
      />
    </>
  );
}
