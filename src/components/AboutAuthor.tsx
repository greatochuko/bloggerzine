"use client";
import React from "react";
import styles from "@/styles/AboutAuthor.module.css";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/services/userServices";
import { Blogpost } from "./Hero";

export default function AboutAuthor({
  author,
  blogposts,
}: {
  author: User;
  blogposts: Blogpost[];
}) {
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
                src={author.imageUrl || ""}
                alt={author.firstname + " " + author.lastname}
                fill
                sizes="80px"
              ></Image>
            </div>
            <div>
              <h3>
                {author.firstname} {author.lastname}
              </h3>
              {author.jobTitle ? <p>{author.jobTitle}</p> : null}
            </div>
          </div>
          <p>
            {blogposts.length} Post{blogposts.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className={styles["bio"]}>
          <h2>Bio:</h2>
          <p>{author.bio}</p>
        </div>
      </div>
    </div>
  );
}
