import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { getUserDashboard } from "@/services/userServices";

export function generateMetadata(): Metadata {
  const user = getUserDashboard();
  return { title: user.name };
}

export default function Dashboard() {
  const user = getUserDashboard();

  if (!user) notFound();

  return (
    <div className={styles["profile-page"]}>
      <Stats authorId={user.id.toString()} />
      <div className={styles["main"]}>
        <AboutAuthor user={user} />
        <RecentComments authorId={user.id.toString()} />
        <ArticleList authorId={user.id.toString()} />
      </div>
    </div>
  );
}
