import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import BlogMetaData from "@/components/BlogMetaData";
import Image from "next/image";
import CategoryList from "@/components/CategoryList";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import {
  getBlogpost,
  getSimilarPosts,
  getBlogpostIsLiked,
} from "@/services/blogServices";
import { getComments } from "@/services/commentServices";
import { Metadata } from "next";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import BlogpostContent from "@/components/BlogpostContent";
import SocialLinks from "@/components/SocialLinks";
import SimilarPosts from "@/components/SimilarPosts";
import LikeSection from "@/components/LikeSection";
import { getSession } from "@/services/userServices";
import { categories } from "@/lib/data";
import { BlogpostType } from "@/lib/types";

export async function generateMetadata({
  params: { blogTitle },
}: {
  params: { blogTitle: string };
}): Promise<Metadata> {
  const blogpost: BlogpostType = await getBlogpost(
    blogTitle.split("_").at(-1) as string
  );

  if (!blogpost) return {};

  return {
    title: blogpost.title,
    description: blogpost.title,
    keywords: blogpost.tags,
    authors: [
      { name: `${blogpost.author.firstname} ${blogpost.author.lastname}` },
    ],
    openGraph: {
      title: blogpost.title,
      description: blogpost.title,
      type: "website",
      url: "https://bloggerzine.vercel.app",
      images: [blogpost.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: blogpost.title,
      description: blogpost.title,
      images: [blogpost.thumbnail],
    },
  };
}

export default async function page({
  params: { blogTitle },
}: {
  params: { blogTitle: string };
}) {
  const blogpost: BlogpostType = await getBlogpost(
    blogTitle.split("_").at(-1) as string
  );

  if (!blogpost) notFound();

  const isLiked = await getBlogpostIsLiked(blogpost.id);
  let similarPosts: BlogpostType[] = await getSimilarPosts(blogpost.title);
  similarPosts = similarPosts.filter((post) => post.id !== blogpost.id);

  const comments = await getComments(blogpost.id);

  const user = await getSession();

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

          {user ? (
            <LikeSection
              blogId={blogpost.id}
              isLiked={isLiked}
              authorId={blogpost.author.id}
            />
          ) : null}

          <section className={styles["about-the-author"]}>
            <Link
              href={createAuthorUrl(blogpost.author)}
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
              <Link href={createAuthorUrl(blogpost.author)}>
                {blogpost.author.firstname + " " + blogpost.author.lastname}
              </Link>
              {blogpost.author.jobTitle ? (
                <p className={styles["jobTitle"]}>{blogpost.author.jobTitle}</p>
              ) : null}
              {blogpost.author.bio ? (
                <p className={styles["bio"]}>{blogpost.author.bio}</p>
              ) : null}
              <SocialLinks author={blogpost.author} />
            </div>
          </section>

          <CommentSection
            comments={comments}
            blogId={blogpost.id}
            userId={user?.id}
          />
        </div>
        <section className={styles["side"]}>
          <div>
            <h2 className={styles["section-heading"]}>Trending Topics</h2>
            <CategoryList categories={categories.slice(0, 6)} />
          </div>
        </section>
        {similarPosts.length ? <SimilarPosts blogposts={similarPosts} /> : null}
      </div>
    </div>
  );
}
