import React from "react";
import styles from "@/styles/AboutAuthor.module.css";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/app/page";
import { UserType } from "@/context/UserContext";

export default function AboutAuthor({ user }: { user: UserType }) {
  return (
    <div className={styles["about-author"]}>
      <div className={styles["header"]}>
        <h1>About Author</h1>
        <Link href={"/edit-profile"}>Edit Profile</Link>
      </div>
      <div className={styles["main"]}>
        <div>
          <div className={styles["main-info"]}>
            <div className={styles["image-container"]}>
              <Image src={user.imageUrl} alt={user.name} fill sizes=""></Image>
            </div>
            <div>
              <h3>{user.name}</h3>
              <p>{user.occupation}</p>
            </div>
          </div>
          <p>
            {blogPosts.filter((blog) => blog.author.id === user.id).length}{" "}
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
