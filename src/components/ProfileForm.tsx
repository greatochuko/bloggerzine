"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ProfileForm.module.css";
import { uploadImage } from "@/utils/imageUploader";
import LoadingIndicator from "./LoadingIndicator";
import { useFormStatus } from "react-dom";
import { updateProfile } from "@/actions/authActions";
import { toast } from "react-toastify";
import { CameraIcon } from "lucide-react";
import { UserType } from "@/lib/types";

export default function ProfileForm({ user }: { user: UserType }) {
  const [profileImage, setProfileImage] = useState({
    loading: false,
    url: user.imageUrl,
  });
  const [coverImage, setCoverImage] = useState({
    loading: false,
    url: user.coverImageUrl,
  });
  const [jobTitle, setJobTitle] = useState(user.jobTitle || "");
  const [bio, setBio] = useState(user.bio || "");

  const isLoadingImage = profileImage.loading || coverImage.loading;

  async function handleChangeProfileImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setProfileImage((curr) => ({ ...curr, loading: true }));
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const { url } = await uploadImage(file);
    setProfileImage({ loading: false, url });
  }

  async function handleChangeCoverImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setCoverImage((curr) => ({ ...curr, loading: true }));
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const { url } = await uploadImage(file);
    setCoverImage({ loading: false, url });
  }

  function handleResetForm() {
    setProfileImage({ loading: false, url: user.imageUrl });
    setCoverImage({ loading: false, url: user.coverImageUrl });
    setJobTitle(user.jobTitle);
    setBio(user.bio);
  }

  const done = false;
  const errorMessage = "";

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
    <form className={styles["profile-form"]} action={updateProfile}>
      <input type="hidden" name="userId" value={user.id} />
      <label htmlFor="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        autoComplete="off"
        placeholder="Enter firstname"
        defaultValue={user.firstname}
        required
      />
      <label htmlFor="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        autoComplete="off"
        placeholder="Enter lastname"
        defaultValue={user.lastname}
        required
      />
      <p>Profile picture</p>
      <div className={styles["profile-picture"]}>
        <label
          htmlFor="profile-picture-input"
          className={styles["profile-picture-container"]}
        >
          <Image
            src={profileImage.url || ""}
            alt={user.firstname + " " + user.lastname}
            fill
            sizes="112px"
          ></Image>
          <div
            className={styles["overlay"]}
            style={{ opacity: profileImage.loading ? 1 : "" }}
          >
            {profileImage.loading ? (
              <LoadingIndicator size={20} color="white" />
            ) : (
              <CameraIcon
                width={24}
                height={24}
                color="white"
                strokeWidth={2.5}
              />
            )}
          </div>
        </label>
        <input
          type="file"
          name="profile-picture-input"
          id="profile-picture-input"
          accept="image/*"
          disabled={profileImage.loading}
          hidden
          onChange={handleChangeProfileImage}
        />
        <input type="hidden" name="imageUrl" value={profileImage.url} />
      </div>
      <p>Cover photo</p>
      <div className={styles["cover-photo"]}>
        <label
          htmlFor="cover-photo-input"
          className={styles["cover-photo-container"]}
        >
          <Image
            src={coverImage.url || ""}
            alt={user.firstname + " " + user.lastname}
            fill
            sizes="320px"
          ></Image>
          <div
            className={styles["overlay"]}
            style={{ opacity: coverImage.loading ? 1 : "" }}
          >
            {coverImage.loading ? (
              <LoadingIndicator size={20} color="white" />
            ) : (
              <CameraIcon
                width={24}
                height={24}
                color="white"
                strokeWidth={2.5}
              />
            )}
          </div>
        </label>
        <input
          type="file"
          name="cover-photo-input"
          id="cover-photo-input"
          accept="image/*"
          hidden
          disabled={coverImage.loading}
          onChange={handleChangeCoverImage}
        />
        <input type="hidden" name="coverImageUrl" value={coverImage.url} />
      </div>
      <label htmlFor="job-title">Job title</label>
      <input
        type="text"
        id="job-title"
        name="jobTitle"
        autoComplete="off"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Enter job title"
      />
      <div className={styles["bio"]}>
        <label htmlFor="bio">Bio</label>

        <textarea
          name="bio"
          id="bio"
          autoComplete="off"
          value={bio}
          onChange={(e) => {
            if (e.target.value.length >= 300) return;
            setBio(e.target.value);
          }}
          placeholder="Write about yourself"
        ></textarea>
        <p className={styles["word-counter"]}>{bio.length}/300</p>
      </div>
      {errorMessage && <p className={styles["error"]}>{errorMessage}</p>}
      <div className={styles["actions"]}>
        <button type="button" onClick={handleResetForm}>
          Reset
        </button>
        <Button isLoadingImage={isLoadingImage} />
      </div>
    </form>
  );
}

function Button({ isLoadingImage }: { isLoadingImage: boolean }) {
  const { pending } = useFormStatus();

  const isLoading = pending || isLoadingImage;

  return (
    <button type="submit" disabled={isLoading}>
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
