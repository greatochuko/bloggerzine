"use client";
import React from "react";
import styles from "@/styles/AboutAuthor.module.css";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/app/page";
import { UserType, useUserContext } from "@/context/UserContext";

export default function AboutAuthor({ user: userProfile }: { user: UserType }) {
  const { user } = useUserContext();
  return (
    <div className={styles["about-author"]}>
      <div className={styles["header"]}>
        <h1>About Author</h1>
        {userProfile.id === user?.id ? (
          <Link href={"/edit-profile"}>Edit Profile</Link>
        ) : null}
      </div>
      <div className={styles["main"]}>
        <div>
          <div className={styles["main-info"]}>
            <div className={styles["image-container"]}>
              <Image
                src={userProfile.imageUrl}
                alt={userProfile.name}
                fill
                sizes="80px"
              ></Image>
            </div>
            <div>
              <h3>{userProfile.name}</h3>
              <p>{userProfile.occupation}</p>
            </div>
          </div>
          <p>
            {
              blogPosts.filter((blog) => blog.author.id === userProfile.id)
                .length
            }
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