import React from "react";
import styles from "./page.module.css";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import SignInWithDemoAccountForm from "@/components/SignInWithDemoAccountForm";

export const metadata: Metadata = { title: "Login" };

export default async function LoginPage() {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["form-container"]}>
        <h1>Log in</h1>
        <LoginForm />
        <div className={styles["divider"]}>
          <hr />
          <p>OR</p>
        </div>
        <SignInWithDemoAccountForm />
      </div>
    </div>
  );
}
