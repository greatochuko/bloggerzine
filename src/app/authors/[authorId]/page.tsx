import React from "react";
import styles from "./page.module.css";
import Stats from "@/components/Stats";

export default function ProfilePage() {
  return (
    <div className={styles["profile-page"]}>
      <Stats />
    </div>
  );
}
