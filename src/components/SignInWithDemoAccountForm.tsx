"use client";
import { login } from "@/actions/authActions";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "@/app/(auth)/login/page.module.css";
import LoadingIndicator from "./LoadingIndicator";

export default function SignInWithDemoAccountForm() {
  const [_, loginAction] = useFormState(login, null);

  return (
    <form action={loginAction}>
      <input type="hidden" name="email" value={"johndoe@gmail.com"} />
      <input type="hidden" name="password" value={"00000000"} />
      <SignInWithDemoAccountBtn />
    </form>
  );
}

function SignInWithDemoAccountBtn() {
  const { pending } = useFormStatus();
  //   const pending = true;
  return (
    <button
      disabled={pending}
      type="submit"
      className={styles["demo-signin-button"]}
    >
      {pending ? <LoadingIndicator size={24} /> : "Sign In with Demo Account"}
    </button>
  );
}
