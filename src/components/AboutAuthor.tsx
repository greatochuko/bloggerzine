"use client";
import React from "react";
import styles from "@/styles/AboutAuthor.module.css";
import Link from "next/link";
import Image from "next/image";
import { UserType, useUserContext } from "@/context/UserContext";
import { getBlogposts } from "@/services/blogServices";
import Navigate from "./Navigate";

export default function AboutAuthor() {
  const { user } = useUserContext();
  if (!user) return <Navigate to="/login" />;

  const authorId = user.id.toString();
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
                src={user.imageUrl}
                alt={user.username}
                fill
                sizes="80px"
              ></Image>
            </div>
            <div>
              <h3>{user.username}</h3>
              {user.jobTitle ? <p>{user.jobTitle}</p> : null}
            </div>
          </div>
          <p>
            {blogposts.filter((blog) => blog.author.id === user.id).length}{" "}
            Posts
          </p>
        </div>
        <div className={styles["bio"]}>
          <h2>Bio:</h2>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
