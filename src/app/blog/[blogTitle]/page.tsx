import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import BlogMetaData from "@/components/BlogMetaData";
import Image from "next/image";
import { categories } from "@/components/Category";
import CategoryList from "@/components/CategoryList";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import { getBlogpost, getSimilarPosts } from "@/services/blogServices";
import { getComments } from "@/services/commentServices";
import { Metadata } from "next";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import BlogpostContent from "@/components/BlogpostContent";
import SocialLinks from "@/components/SocialLinks";
import { Blogpost } from "@/components/Hero";
import { createClient } from "@/utils/supabase/server";
import SimilarPosts from "@/components/SimilarPosts";

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

  const similarPosts = await getSimilarPosts(blogpost.title);

  const comments = await getComments(blogpost.id);

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
              {blogpost.author.jobTitle ? (
                <p className={styles["jobTitle"]}>{blogpost.author.jobTitle}</p>
              ) : null}
              {blogpost.author.bio ? (
                <p className={styles["bio"]}>{blogpost.author.bio}</p>
              ) : null}
              <SocialLinks socialLinks={blogpost.author.socialLinks} />
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
        <SimilarPosts blogposts={similarPosts} />
      </div>
    </div>
  );
}
