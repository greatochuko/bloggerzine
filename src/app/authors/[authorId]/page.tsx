import { getUser } from "@/services/userServices";
import { Metadata } from "next";
import React from "react";
import styles from "./page.module.css";

export function generateMetadata({
  params,
}: {
  params: { authorId: string };
}): Metadata {
  const user = getUser(params.authorId);
  return { title: user?.name };
}

export default function AuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const author = getUser(params.authorId);

  return <div className={styles["author-page"]}>AuthorPage</div>;
}
