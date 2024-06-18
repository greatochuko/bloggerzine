import { getUser } from "@/services/userServices";
import { Metadata } from "next";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogpostByAuthor } from "@/services/blogServices";
import SearchBlog from "@/components/SearchBlog";
import Paginator from "@/components/Paginator";

export function generateMetadata({
  params,
}: {
  params: { username: string };
}): Metadata {
  const author = getUser(params.username);
  return { title: author?.username };
}

export default function AuthorPage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { page: string };
}) {
  const author = getUser(params.username);
  if (!author) notFound();

  // if (!author) throw new Error();

  const currentPage = Number(searchParams.page) || 1;
  const blogposts = getBlogpostByAuthor(author.id.toString());
  const postsPerPage = 8;
  const paginatedPosts = blogposts.slice(
    (currentPage - 1) * postsPerPage,
    (currentPage - 1) * postsPerPage + postsPerPage
  );
  const maxPage = Math.ceil(blogposts.length / postsPerPage);

  return (
    <div className={styles["author-page"]}>
      <div className={styles["header"]}>
        <div className={styles["cover-photo-container"]}>
          <Image
            src={author.coverImageUrl}
            alt={author.fullname}
            fill
            sizes=""
          ></Image>
        </div>
        <div className={styles["author-details"]}>
          <div className={styles["image-container"]}>
            <Image
              src={author.imageUrl}
              alt={author.fullname}
              fill
              sizes=""
            ></Image>
          </div>
          <div className={styles["text"]}>
            <h1>{author.fullname}</h1>
            <p>
              {author.jobTitle?<span>
                <svg
                  height={18}
                  width={18}
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
                      d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M16 7V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V7"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M22 12L12.3922 13.9216C12.1333 13.9733 11.8667 13.9733 11.6078 13.9216L2 12"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                {author.jobTitle}
              </span>:null}
              <span>
                <svg
                  height={18}
                  width={18}
                  viewBox="-0.5 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#333"
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
                      fill="#333"
                      fillRule="evenodd"
                      d="M107,154.006845 C107,153.45078 107.449949,153 108.006845,153 L119.993155,153 C120.54922,153 121,153.449949 121,154.006845 L121,165.993155 C121,166.54922 120.550051,167 119.993155,167 L108.006845,167 C107.45078,167 107,166.550051 107,165.993155 L107,154.006845 Z M108,157 L120,157 L120,166 L108,166 L108,157 Z M116.5,163.5 L116.5,159.5 L115.757485,159.5 L114.5,160.765367 L114.98503,161.275112 L115.649701,160.597451 L115.649701,163.5 L116.5,163.5 Z M112.5,163.5 C113.412548,163.5 114,163.029753 114,162.362119 C114,161.781567 113.498099,161.473875 113.110266,161.433237 C113.532319,161.357765 113.942966,161.038462 113.942966,160.550798 C113.942966,159.906386 113.395437,159.5 112.505703,159.5 C111.838403,159.5 111.359316,159.761248 111.051331,160.115385 L111.456274,160.632075 C111.724335,160.370827 112.055133,160.231495 112.425856,160.231495 C112.819392,160.231495 113.13308,160.382438 113.13308,160.690131 C113.13308,160.974601 112.847909,161.102322 112.425856,161.102322 C112.28327,161.102322 112.020913,161.102322 111.952471,161.096517 L111.952471,161.839623 C112.009506,161.833817 112.26616,161.828012 112.425856,161.828012 C112.956274,161.828012 113.190114,161.967344 113.190114,162.275036 C113.190114,162.565312 112.93346,162.768505 112.471483,162.768505 C112.10076,162.768505 111.684411,162.605951 111.427757,162.327286 L111,162.87881 C111.279468,163.227141 111.804183,163.5 112.5,163.5 Z M110,152.5 C110,152.223858 110.214035,152 110.504684,152 L111.495316,152 C111.774045,152 112,152.231934 112,152.5 L112,153 L110,153 L110,152.5 Z M116,152.5 C116,152.223858 116.214035,152 116.504684,152 L117.495316,152 C117.774045,152 118,152.231934 118,152.5 L118,153 L116,153 L116,152.5 Z"
                      transform="translate(-107 -152)"
                    ></path>{" "}
                  </g>
                </svg>
                Joined on Jan 25 2024
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles["main"]}>
        <h2>
          Articles <span>{blogposts.length}</span>
        </h2>
        <div className={styles["blog-list"]}>
          {paginatedPosts.map((blog) => (
            <SearchBlog blog={blog} key={blog.id} />
          ))}
        </div>
        <Paginator numPages={maxPage} />
      </div>
    </div>
  );
}
