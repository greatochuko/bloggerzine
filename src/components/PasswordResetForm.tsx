"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "@/actions/authActions";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function PasswordResetForm({
  email,
  firstname,
}: {
  email: string;
  firstname: string;
}) {
  return (
    <form action={sendResetPasswordEmail}>
      <input type="hidden" name="email" defaultValue={email} />
      <input type="hidden" name="firstname" defaultValue={firstname} />
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button type="submit">
      {pending ? (
        <>
          <LoadingIndicator color="white" size={20} />
          Sending...
        </>
      ) : (
        "Resend Verification Email"
      )}
    </button>
  );
}
