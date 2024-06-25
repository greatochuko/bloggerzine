import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";
import AboutAuthor from "@/components/AboutAuthor";
import RecentComments from "@/components/RecentComments";
import ArticleList from "@/components/ArticleList";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) redirect(`/login`);

  return (
    <div className={styles["profile-page"]}>
      <Stats author={data.user} />
      <div className={styles["main"]}>
        <AboutAuthor author={data.user} />
        <RecentComments author={data.user} />
        <ArticleList author={data.user} />
      </div>
    </div>
  );
}
