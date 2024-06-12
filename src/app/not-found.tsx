import React from "react";
import styles from "./not-found.module.css";
import BackButton from "@/components/BackButton";

export default function NotFoundPage() {
  return (
    <div className={styles["not-found"]}>
      <h1>404</h1>
      <h2>Page not Found</h2>
      <p>Either something went wrong or this page dosen't exist anymore</p>
      <BackButton />
    </div>
  );
}
