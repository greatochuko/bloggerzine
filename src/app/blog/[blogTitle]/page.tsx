import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import BlogMetaData from "@/components/BlogMetaData";
import Image from "next/image";
import { categories } from "@/app/categories/page";
import CategoryList from "@/components/CategoryList";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import convertToUrl from "@/utils/convertToUrl";
import { getBlogpost, getBlogposts } from "@/services/blogServices";
import { getComments } from "@/services/commentServices";

export default function page({
  params: { blogTitle },
}: {
  params: { blogTitle: string };
}) {
  const blogpost = getBlogpost(blogTitle.split("-").at(-1) as string);

  if (!blogpost) notFound();

  const comments = getComments(blogpost.id.toString());

  return (
    <div className={styles["blog-page"]}>
      <div className={styles["header"]}>
        <Image
          src={blogpost.imageUrl}
          alt={blogpost.title}
          sizes="950vw"
          fill
        ></Image>
        <div className={styles["overlay"]}>
          <p
            className={styles["blog-category"]}
            style={{
              backgroundColor: categories.find(
                (cat) =>
                  cat.name.toLowerCase() === blogpost.category.toLowerCase()
              )?.color,
            }}
          >
            {blogpost.category}
          </p>
          <h1>{blogpost.title}</h1>
          <BlogMetaData blog={blogpost} />
        </div>
      </div>
      <div className={styles["main-section"]}>
        <div className={styles["blog-content"]}>
          <p>{blogpost.content}</p>

          <section className={styles["about-the-author"]}>
            <Link
              href={`/authors/${convertToUrl(blogpost.author.name)}-${
                blogpost.author.id
              }`}
              className={styles["image-container"]}
            >
              <Image
                src={blogpost.author.imageUrl}
                alt={blogpost.author.name}
                fill
                sizes=""
              ></Image>
            </Link>
            <div className={styles["text"]}>
              <Link
                href={`/authors/${convertToUrl(blogpost.author.name)}-${
                  blogpost.author.id
                }`}
              >
                {blogpost.author.name}
              </Link>
              <p>{blogpost.author.bio}</p>
            </div>
          </section>

          <CommentSection comments={comments} />
        </div>
        <section className={styles["side"]}>
          <div>
            <h2 className={styles["section-heading"]}>Trending Topics</h2>
            <CategoryList categories={categories.slice(0, 5)} />
          </div>
        </section>
      </div>
    </div>
  );
}
