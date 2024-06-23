"use client";
import React, { useEffect } from "react";
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
import { login } from "@/actions/userActions";
import { useUserContext } from "@/context/UserContext";
import { redirect, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, {
    data: null,
    errorMessage: "",
  });

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const { user, setUser } = useUserContext();

  const { data, errorMessage } = state;

  useEffect(() => {
    if (data && setUser) {
      localStorage.setItem("token", data.token);
      setUser(data.userProfile);
    }
  }, [data]);

  if (user) redirect(redirectTo || "/");

  return (
    <form className={styles["login-form"]} action={formAction}>
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
