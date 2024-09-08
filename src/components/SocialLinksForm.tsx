"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/SocialLinksForm.module.css";
import { UserType } from "@/services/userServices";
import { updateSocialLinks } from "@/actions/authActions";
import { useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
import { toast } from "react-toastify";

export default function SocialLinksForm({ user }: { user: UserType }) {
  const [facebook, setFacebook] = useState(user.facebookUrl);
  const [twitter, setTwitter] = useState(user.twitterUrl);
  const [instagram, setInstagram] = useState(user.instagramUrl);
  const [linkedIn, setlinkedIn] = useState(user.linkedInUrl);

  const done = false;
  const errorMessage = "";

  function handleResetForm() {
    setFacebook(user.facebookUrl);
    setTwitter(user.twitterUrl);
    setInstagram(user.instagramUrl);
    setlinkedIn(user.linkedInUrl);
  }

  useEffect(() => {
    if (done) {
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
        });
      }
      toast.success("Profile Updated Successfully", {
        position: "top-right",
      });
    }
  }, [done, errorMessage]);

  return (
    <form className={styles["social-links-form"]} action={updateSocialLinks}>
      <label htmlFor="facebook">Facebook</label>
      <input
        type="text"
        id="facebook"
        name="facebook"
        value={facebook}
        onChange={(e) => setFacebook(e.target.value)}
        placeholder="Enter facebook URL"
      />
      <label htmlFor="twitter">Twitter</label>
      <input
        type="text"
        id="twitter"
        name="twitter"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
        placeholder="Enter twitter URL"
      />
      <label htmlFor="instagram">Instagram</label>
      <input
        type="text"
        id="instagram"
        name="instagram"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        placeholder="Enter instagram URL"
      />
      <label htmlFor="linkedIn">Linkedin</label>
      <input
        type="text"
        id="linkedIn"
        name="linkedIn"
        value={linkedIn}
        onChange={(e) => setlinkedIn(e.target.value)}
        placeholder="Enter linkedIn URL"
      />
      {errorMessage && <p className={styles["error"]}>{errorMessage}</p>}
      <div className={styles["actions"]}>
        <button type="button" onClick={handleResetForm}>
          Reset
        </button>
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
