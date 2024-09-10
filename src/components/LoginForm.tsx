"use client";
import React, { useState } from "react";
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";
import LoadingIndicator from "./LoadingIndicator";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cannotSubmit = !email || !password;

  const [loginState, loginAction] = useFormState(login, null);

  const errorMessage = loginState?.errorMessage;

  return (
    <form className={styles["login-form"]} action={loginAction}>
      <div className={styles["input-group"]}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage ? (
          <p className={styles["error"]}>{errorMessage}</p>
        ) : null}
        <input type="hidden" name="redirectTo" value={redirectTo} />
      </div>
      <div className={styles["actions"]}>
        <SubmitButton cannotSubmit={cannotSubmit} />
        <p>
          Don&apos;t have an account? <Link href={"/signup"}>Signup</Link>
        </p>
      </div>
    </form>
  );
}

function SubmitButton({ cannotSubmit }: { cannotSubmit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={cannotSubmit || pending}>
      {pending ? <LoadingIndicator size={20} color="#fff" /> : "Sign In"}
    </button>
  );
}
