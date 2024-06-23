import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { getUserDashboard } from "@/services/userServices";
import Authenticate from "@/components/Authenticate";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <Authenticate>
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
