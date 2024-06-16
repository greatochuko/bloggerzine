import React from "react";
import styles from "./page.module.css";
import { getUserDashboard } from "@/services/userServices";
import ProfileForm from "@/components/ProfileForm";
import Navigate from "@/components/Navigate";

export default function SettingsPage() {
  const user = getUserDashboard();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className={styles["settings-page"]}>
      <div className={styles["section"]}>
        <h2 className="title">Profile</h2>
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
