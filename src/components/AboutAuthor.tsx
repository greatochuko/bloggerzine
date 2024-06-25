"use client";
import React from "react";
import styles from "@/styles/AboutAuthor.module.css";
import Link from "next/link";
import Image from "next/image";
import { getBlogposts } from "@/services/blogServices";
import { User } from "@supabase/supabase-js";

export default function AboutAuthor({ author }: { author: User }) {
  const blogposts = getBlogposts();

  return (
    <div className={styles["about-author"]}>
      <div className={styles["header"]}>
        <h1>About You</h1>
        <Link href={"/settings"}>Edit Profile</Link>
      </div>
      <div className={styles["main"]}>
        <div>
          <div className={styles["main-info"]}>
            <div className={styles["image-container"]}>
              <Image
                src={author.user_metadata.imageUrl}
                alt={
                  author.user_metadata.firstname +
                  " " +
                  author.user_metadata.lastname
                }
                fill
                sizes="80px"
              ></Image>
            </div>
            <div>
              <h3>
                {author.user_metadata.firstname} {author.user_metadata.lastname}
              </h3>
              {author.user_metadata.jobTitle ? (
                <p>{author.user_metadata.jobTitle}</p>
              ) : null}
            </div>
          </div>
          <p>
            {/* {blogposts.filter((blog) => blog.author.id === author.id).length}{" "} */}
            Posts
          </p>
        </div>
        <div className={styles["bio"]}>
          <h2>Bio:</h2>
          <p>{author.user_metadata.bio}</p>
        </div>
      </div>
    </div>
  );
}
