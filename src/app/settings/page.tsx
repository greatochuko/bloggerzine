import React from "react";
import styles from "./page.module.css";
import { getUserDashboard } from "@/services/userServices";
import ProfileForm from "@/components/ProfileForm";
import Navigate from "@/components/Navigate";
import SocialLinksForm from "@/components/SocialLinksForm";
import { Metadata } from "next";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  const user = getUserDashboard();

  if (!user) return <Navigate to="/login" />;

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
      <div className={styles["section"]}>
        <h2>Change Password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
