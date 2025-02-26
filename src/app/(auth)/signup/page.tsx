import React from "react";
import styles from "./page.module.css";
import SignupForm from "@/components/SignupForm";
import { Metadata } from "next";
import SignInWithDemoAccountForm from "@/components/SignInWithDemoAccountForm";

export const metadata: Metadata = { title: "Signup" };

export default async function SignupPage() {
  return (
    <div className={styles["signup-page"]}>
      <div className={styles["form-container"]}>
        <h1>Signup</h1>
        <SignupForm />
        <div className={styles["divider"]}>
          <hr />
          <p>OR</p>
        </div>
        <SignInWithDemoAccountForm />
      </div>
    </div>
  );
}
