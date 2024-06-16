import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import { notFound } from "next/navigation";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { getUserDashboard } from "@/services/userServices";
import Navigate from "@/components/Navigate";

export function generateMetadata(): Metadata {
  const user = getUserDashboard();
  return { title: user.fullname };
}

export default function Dashboard() {
  const user = getUserDashboard();

  if (!user) return <Navigate to="/login" />;

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
