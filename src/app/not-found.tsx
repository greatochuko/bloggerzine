import React from "react";
import styles from "./not-found.module.css";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
        <ArrowLeft />
        Back to home page
      </Link>
    </div>
  );
}
