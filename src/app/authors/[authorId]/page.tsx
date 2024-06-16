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
  params: { authorId: string };
}): Metadata {
  const author = getUser(params.authorId.split("-").at(-1) as string);
  return { title: author?.name };
}

export default function AuthorPage({
  params,
  searchParams,
}: {
  searchParams: { page: string };
  params: { authorId: string };
}) {
  const author = getUser(params.authorId.split("-").at(-1) as string);
  if (!author) notFound();

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
        <div className={styles["image-container"]}>
          <Image src={author.imageUrl} alt={author.name} fill sizes=""></Image>
        </div>
        <h1>{author.name}</h1>
        <h3>{author.occupation}</h3>
        <p>{author.bio}</p>
      </div>
      <div className={styles["main"]}>
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
