"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { sendVerificationEmail } from "@/actions/authActions";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useSearchParams } from "next/navigation";

export default function EmailVerificationForm({ email }: { email: string }) {
  return (
    <form action={sendVerificationEmail}>
      <input type="hidden" name="email" defaultValue={email} />
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  // const pending = true;
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
