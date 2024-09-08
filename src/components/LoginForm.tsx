"use client";
import React from "react";
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/authActions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const errorMessage = "";

  return (
    <form className={styles["login-form"]} action={login}>
      <div className={styles["input-group"]}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          name="password"
          required
        />
        {errorMessage ? (
          <p className={styles["error"]}>{errorMessage}</p>
        ) : null}
      </div>
      <div className={styles["actions"]}>
        <Button />
        <p>
          Don&apos;t have an account? <Link href={"/signup"}>Signup</Link>
        </p>
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button type="submit">
      {pending ? <LoadingIndicator size={20} color="#fff" /> : "Sign In"}
    </button>
  );
}
