import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import Authenticate from "@/components/Authenticate";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <Authenticate>
      {"use client"}
      <div className={styles["profile-page"]}>
        <Stats />
        <div className={styles["main"]}>
          <AboutAuthor />
          <RecentComments />
          <ArticleList />
        </div>
      </div>
    </Authenticate>
  );
}
