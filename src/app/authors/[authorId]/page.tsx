import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { getUser, getUsers } from "@/services/userServices";

export function generateMetadata({
  params,
}: {
  params: { authorId: string };
}): Metadata {
  const authorId = params.authorId.split("-").at(-1);
  const user = getUser(authorId as string);
  return { title: user?.name };
}

export default function ProfilePage({
  params,
}: {
  params: { authorId: string };
}) {
  const authorId = params.authorId.split("-").at(-1);
  const user = getUser(authorId as string);

  if (!user || !authorId) notFound();

  return (
    <div className={styles["profile-page"]}>
      <Stats />
      <div className={styles["main"]}>
        <AboutAuthor user={user} />
        <RecentComments authorId={authorId} />
        <ArticleList authorId={authorId} />
      </div>
    </div>
  );
}
