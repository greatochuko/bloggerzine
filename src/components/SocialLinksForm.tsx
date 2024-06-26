"use client";
import React from "react";
import styles from "@/styles/SocialLinksForm.module.css";
import { User } from "@/services/userServices";
import { updateSocialLinks } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function SocialLinksForm({ user }: { user: User }) {
  const [state, updateSocialLinksAction] = useFormState(updateSocialLinks, {
    errorMessage: "",
  });

  const { errorMessage } = state;

  return (
    <form
      className={styles["social-links-form"]}
      action={updateSocialLinksAction}
    >
      <label htmlFor="facebook">Facebook</label>
      <input
        type="text"
        id="facebook"
        name="facebook"
        defaultValue={user.socialLinks.facebook}
        placeholder="Enter facebook URL"
      />
      <label htmlFor="twitter">Twitter</label>
      <input
        type="text"
        id="twitter"
        name="twitter"
        defaultValue={user.socialLinks.twitter}
        placeholder="Enter twitter URL"
      />
      <label htmlFor="instagram">Instagram</label>
      <input
        type="text"
        id="instagram"
        name="instagram"
        defaultValue={user.socialLinks.instagram}
        placeholder="Enter instagram URL"
      />
      <label htmlFor="linkedIn">Linkedin</label>
      <input
        type="text"
        id="linkedIn"
        name="linkedIn"
        defaultValue={user.socialLinks.linkedIn}
        placeholder="Enter linkedIn URL"
      />
      {errorMessage && <p className={styles["error"]}>{errorMessage}</p>}
      <div className={styles["actions"]}>
        <button type="reset">Reset</button>
        <Button />
      </div>
    </form>
  );
}
function Button() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <LoadingIndicator size={20} color="white" />
          Saving...
        </>
      ) : (
        "Save Changes"
      )}
    </button>
  );
}
