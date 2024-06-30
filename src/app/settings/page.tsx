import React from "react";
import styles from "./page.module.css";
import { getUser } from "@/services/userServices";
import ProfileForm from "@/components/ProfileForm";
import SocialLinksForm from "@/components/SocialLinksForm";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ResetPasswordSection } from "@/components/ResetPasswordSection";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const userId = data.user?.id;

  const { user } = await getUser(userId as string);

  if (!user) notFound();

  return (
    <div className={styles["settings-page"]}>
      <div className={styles["section"]}>
        <h2>Profile</h2>
        <ProfileForm user={user} />
      </div>
      <div className={styles["section"]}>
        <h2>Social Links</h2>
        <SocialLinksForm user={user} />
      </div>
      <ResetPasswordSection />
    </div>
  );
}
