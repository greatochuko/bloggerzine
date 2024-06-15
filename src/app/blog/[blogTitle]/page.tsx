import React from "react";
import styles from "./page.module.css";
import { blogPosts } from "@/app/page";
import { notFound } from "next/navigation";
import BlogMetaData from "@/components/BlogMetaData";
import Image from "next/image";
import { categories } from "@/app/categories/page";
import CategoryList from "@/components/CategoryList";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import convertToUrl from "@/utils/convertToUrl";

export const comments = [
  {
    id: 1,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 1,
    },
    user: {
      name: "John Doe",
      imageUrl: "/user-2.jpg",
      id: 2,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "June 11, 2022 at 6:01 am",
    parentId: null,
  },
  {
    id: 2,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 1,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "June 11, 2022 at 6:01 am",
    parentId: 1,
  },

  {
    id: 4,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 1,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "June 11, 2022 at 6:01 am",
    parentId: null,
  },
  {
    id: 5,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 1,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "June 11, 2022 at 6:01 am",
    parentId: 4,
  },
  {
    id: 7,
    blog: {
      title:
        "The Future of AI: How Artificial Intelligence is Transforming Industries",
      id: 1,
    },
    user: {
      name: "Great Ochuko",
      imageUrl: "/profile-pic.jpg",
      id: 1,
    },
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga nobis voluptas dicta distinctio.",
    dateCreated: "June 11, 2022 at 6:01 am",
    parentId: 5,
  },
];

export default function page({
  params: { blogTitle },
}: {
  params: { blogTitle: string };
}) {
  const blogpost = blogPosts.find(
    (b) => b.id === Number(blogTitle.split("-").at(-1))
  );

  if (!blogpost) notFound();

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
