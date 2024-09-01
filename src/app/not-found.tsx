import React from "react";
import styles from "./not-found.module.css";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Page not found",
};

export default function NotFoundPage() {
  return (
    <div className={styles["not-found"]}>
      <h1>404</h1>
      <h2>Page not Found</h2>
      <p>Either something went wrong or this page dosen&apos;t exist anymore</p>
      <Link href={"/"}>
        <svg
          fill="#000000"
          height={16}
          width={16}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          enableBackground="new 0 0 512 512"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <polygon points="213.3,205.3 213.3,77.3 0,248 213.3,418.7 213.3,290.7 512,290.7 512,205.3 "></polygon>
          </g>
        </svg>
        Back to home page
      </Link>
    </div>
  );
}
