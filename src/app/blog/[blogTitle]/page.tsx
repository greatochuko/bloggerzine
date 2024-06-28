import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import BlogMetaData from "@/components/BlogMetaData";
import Image from "next/image";
import { categories } from "@/app/categories/page";
import CategoryList from "@/components/CategoryList";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import { getBlogpost } from "@/services/blogServices";
import { getComments } from "@/services/commentServices";
import { Metadata } from "next";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import BlogpostContent from "@/components/BlogpostContent";
import SocialLinks from "@/components/SocialLinks";
import { Blogpost } from "@/components/Hero";

export async function generateMetadata({
  params: { blogTitle },
}: {
  params: { blogTitle: string };
}): Promise<Metadata> {
  const blogpost = await getBlogpost(blogTitle.split("_").at(-1) as string);
  return { title: blogpost?.title };
}

export default async function page({
  params: { blogTitle },
}: {
  params: { blogTitle: string };
}) {
  const blogpost: Blogpost = await getBlogpost(
    blogTitle.split("_").at(-1) as string
  );

  if (!blogpost) notFound();

  const comments = getComments(blogpost._id.toString());

  return (
    <div className={styles["blog-page"]}>
      <div className={styles["header"]}>
        <Image
          src={blogpost.thumbnail || ""}
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
          <BlogpostContent content={blogpost.content} />

          <section className={styles["about-the-author"]}>
            <Link
              href={`/authors/${createAuthorUrl(blogpost.author)}`}
              className={styles["image-container"]}
            >
              <Image
                src={blogpost.author.imageUrl || ""}
                alt={blogpost.author.firstname + " " + blogpost.author.lastname}
                fill
                sizes="80px"
              ></Image>
            </Link>
            <div className={styles["text"]}>
              <Link href={`/authors/${createAuthorUrl(blogpost.author)}`}>
                {blogpost.author.firstname + " " + blogpost.author.lastname}
              </Link>
              <SocialLinks socialLinks={blogpost.author.socialLinks} />
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
