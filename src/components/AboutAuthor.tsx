"use client";
import React from "react";
import styles from "@/styles/AboutAuthor.module.css";
import Link from "next/link";
import Image from "next/image";
import { UserType, useUserContext } from "@/context/UserContext";
import { getBlogposts } from "@/services/blogServices";

export default function AboutAuthor({ user: userProfile }: { user: UserType }) {
  const { user } = useUserContext();
  const blogposts = getBlogposts();

  return (
    <div className={styles["about-author"]}>
      <div className={styles["header"]}>
        <h1>About You</h1>
        {userProfile.id === user?.id ? (
          <Link href={"/settings"}>Edit Profile</Link>
        ) : null}
      </div>
      <div className={styles["main"]}>
        <div>
          <div className={styles["main-info"]}>
            <div className={styles["image-container"]}>
              <Image
                src={userProfile.imageUrl}
                alt={userProfile.username}
                fill
                sizes="80px"
              ></Image>
            </div>
            <div>
              <h3>{userProfile.username}</h3>
             {userProfile.jobTitle? <p>{userProfile.jobTitle}</p>:null}
            </div>
          </div>
          <p>
            {
              blogposts.filter((blog) => blog.author.id === userProfile.id)
                .length
            }{" "}
            Posts
          </p>
        </div>
        <div className={styles["bio"]}>
          <h2>Bio:</h2>
          <p>{userProfile.bio}</p>
        </div>
      </div>
    </div>
  );
}
