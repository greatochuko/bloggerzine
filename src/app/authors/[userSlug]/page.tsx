import { getUser } from "@/services/userServices";
import { Metadata } from "next";
import React from "react";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { getBlogpostByAuthor } from "@/services/blogServices";
import Paginator from "@/components/Paginator";
import SocialLinks from "@/components/SocialLinks";
import { BriefcaseBusinessIcon, CalendarIcon } from "lucide-react";
import Blog from "@/components/Blog";
import CustomImage from "@/components/CustomImage";
import { UserType } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: { userSlug: string };
}): Promise<Metadata> {
  const userId = params.userSlug.split("_").at(-1) as string;
  const { user } = await getUser(userId);
  const author = user as UserType;
  return {
    title: author?.firstname + " " + author?.lastname,
    description: author.bio,
    keywords: author.bio,
    authors: [{ name: `${author.firstname} ${author.lastname}` }],
    openGraph: {
      title: `${author?.firstname} ${author?.lastname} - Bloggerzine`,
      description: author.bio,
      type: "website",
      url: "https://bloggerzine.vercel.app",
      images: [author.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${author?.firstname} ${author?.lastname} - Bloggerzine`,
      description: author.bio,
      images: [author.imageUrl],
    },
  };
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: { userSlug: string };
  searchParams: { page: string };
}) {
  const userId = params.userSlug.split("_").at(-1) as string;
  const { user: author }: { user: UserType | null } = await getUser(userId);

  if (!author) notFound();

  const currentPage = Number(searchParams.page) || 1;
  const blogposts = await getBlogpostByAuthor(author.id.toString());
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
          <CustomImage
            src={author.coverImageUrl || ""}
            alt={author.firstname + " " + author.lastname}
            fill
            sizes=""
          ></CustomImage>
        </div>
        <div className={styles["author-details"]}>
          <div className={styles["image-container"]}>
            <CustomImage
              src={author.imageUrl || ""}
              alt={author.firstname + " " + author.lastname}
              fill
              sizes=""
            ></CustomImage>
          </div>
          <div className={styles["text"]}>
            <h1>{author.firstname + " " + author.lastname}</h1>
            <p>
              {author.jobTitle ? (
                <span>
                  <BriefcaseBusinessIcon color="#333" width={18} height={18} />
                  {author.jobTitle}
                </span>
              ) : null}
              <span>
                <CalendarIcon color="#333" width={18} height={18} />
                Joined on{" "}
                {new Date(author.createdAt)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </span>
            </p>
            <SocialLinks author={author} />
          </div>
        </div>
      </div>
      <div className={styles["main"]}>
        <h2>
          Articles <span>{blogposts.length}</span>
        </h2>
        <div className={styles["blog-list"]}>
          {paginatedPosts.map((blogpost) => (
            <Blog blogpost={blogpost} key={blogpost.id} />
          ))}
        </div>
        {blogposts.length ? <Paginator numPages={maxPage} /> : null}
      </div>
    </div>
  );
}
