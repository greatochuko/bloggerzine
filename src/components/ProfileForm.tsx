"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ProfileForm.module.css";
import { uploadImage } from "@/utils/imageUploader";
import LoadingIndicator from "./LoadingIndicator";
import { useFormStatus } from "react-dom";
import { User } from "@/services/userServices";
import { updateProfile } from "@/actions/authActions";
import { toast } from "react-toastify";

export default function ProfileForm({ user }: { user: User }) {
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
        placeholder="Enter firstname"
        defaultValue={user.firstname}
        required
      />
      <label htmlFor="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
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
              <svg
                height={24}
                width={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#fff"
                    d="M21 3H3C1.35 3 0 4.35 0 6v12c0 1.55 1.19 2.83 2.7 2.98.1.01.2.02.3.02h18c.1 0 .2 0 .29-.02.03 0 .06-.01.09-.01C22.86 20.78 24 19.52 24 18V6c0-1.65-1.35-3-3-3zm1 13.53l-2.21-4.42c-.25-.5-.69-.87-1.22-1.03-.19-.05-.38-.08-.57-.08-.35 0-.7.09-1.01.27l-6.41 3.74-2.46-1.67C7.78 13.11 7.39 13 7 13c-.52 0-1.03.2-1.41.59L2 17.18V6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v10.53z"
                  ></path>
                  <circle fill="#fff" cx="11" cy="10" r="2"></circle>
                </g>
              </svg>
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
              <svg
                height={24}
                width={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#fff"
                    d="M21 3H3C1.35 3 0 4.35 0 6v12c0 1.55 1.19 2.83 2.7 2.98.1.01.2.02.3.02h18c.1 0 .2 0 .29-.02.03 0 .06-.01.09-.01C22.86 20.78 24 19.52 24 18V6c0-1.65-1.35-3-3-3zm1 13.53l-2.21-4.42c-.25-.5-.69-.87-1.22-1.03-.19-.05-.38-.08-.57-.08-.35 0-.7.09-1.01.27l-6.41 3.74-2.46-1.67C7.78 13.11 7.39 13 7 13c-.52 0-1.03.2-1.41.59L2 17.18V6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v10.53z"
                  ></path>
                  <circle fill="#fff" cx="11" cy="10" r="2"></circle>
                </g>
              </svg>
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
        name="job-title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Enter job title"
      />
      <div className={styles["bio"]}>
        <label htmlFor="bio">Bio</label>

        <textarea
          name="bio"
          id="bio"
          value={bio}
          onChange={(e) => {
            if (e.target.value.length >= 150) return;
            setBio(e.target.value);
          }}
          placeholder="Write about yourself"
        ></textarea>
        <p className={styles["word-counter"]}>{bio.length}/150</p>
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
