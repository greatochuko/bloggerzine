import React from "react";
import styles from "./page.module.css";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";

export default async function UpdatePasswordPage() {
  return (
    <div className={styles["update-password-page"]}>
      <div className={styles["form-container"]}>
        <h1>Update password</h1>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
