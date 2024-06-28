import React from "react";
import styles from "./page.module.css";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className={styles["update-password-page"]}>
      <div className={styles["form-container"]}>
        <h1>Update password</h1>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
