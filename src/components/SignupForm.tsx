"use client";
import React from "react";
import styles from "@/styles/SignupForm.module.css";
import Link from "next/link";

export default function SignupForm() {
  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <form className={styles["signup-form"]} onSubmit={handleSignup}>
      <label htmlFor="full-name">Full Name</label>
      <input type="text" placeholder="Full Name" id="full-name" />
      <label htmlFor="email">Email Address</label>
      <input type="email" placeholder="Email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="********" id="password" />
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        type="confirm-password"
        placeholder="********"
        id="confirm-password"
      />
      <div className={styles["actions"]}>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link href={"/login"}>Login</Link>
        </p>
      </div>
    </form>
  );
}
