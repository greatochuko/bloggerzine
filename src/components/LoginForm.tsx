"use client";
import React from "react";
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";

export default function LoginForm() {
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <form className={styles["login-form"]} onSubmit={handleLogin}>
      <label htmlFor="email">Email Address</label>
      <input type="email" id="email" placeholder="Email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" placeholder="********" />
      <div className={styles["actions"]}>
        <button type="submit">Sign In</button>
        <p>
          Don&apos;t have an account? <Link href={"/signup"}>Signup</Link>
        </p>
      </div>
    </form>
  );
}
