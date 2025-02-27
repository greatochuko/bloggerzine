import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/NavUser.module.css";
import Link from "next/link";
import SignoutModal from "./SignoutModal";
import { UserType } from "@/services/userServices";
import { createAuthorUrl } from "@/utils/createAuthorUrl";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LayoutDashboardIcon,
  PowerIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

export default function NavUser({ user }: { user: UserType }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
      setShowDropdown(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles["user-container"]} ref={dropdownRef}>
        <div
          className={styles["user"]}
          onClick={() => setShowDropdown((curr) => !curr)}
        >
          <div className={styles["image-container"]}>
            <Image
              src={user.imageUrl || ""}
              alt={user.firstname + " " + user.lastname}
              fill
              sizes="80px"
            ></Image>
          </div>
          <p className={styles["text"]}>{user.firstname}</p>
          {showDropdown ? (
            <ChevronUpIcon width={16} height={16} />
          ) : (
            <ChevronDownIcon width={16} height={16} />
          )}
        </div>
        {showDropdown ? (
          <div
            className={styles["dropdown"]}
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={createAuthorUrl(user)}
              className={styles["user-details"]}
            >
              <div className={styles["image-container"]}>
                <Image
                  src={user.imageUrl || ""}
                  alt={user.firstname + " " + user.lastname}
                  fill
                  sizes="80px"
                ></Image>
              </div>
              <div className={styles["text"]}>
                <h4>{user.firstname + " " + user.lastname}</h4>
                <p>{user.email}</p>
              </div>
            </Link>
            <hr />
            <ul
              className={styles["option-list"]}
              onClick={() => setShowDropdown(false)}
            >
              <li>
                <Link href={"/dashboard"}>
                  <LayoutDashboardIcon color="#666" width={18} height={18} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={createAuthorUrl(user)}>
                  <UserIcon color="#666" width={18} height={18} />
                  My Profile
                </Link>
              </li>
              <li>
                <Link href={"/settings"}>
                  <SettingsIcon color="#666" width={18} height={18} />
                  Settings
                </Link>
              </li>
            </ul>
            <hr />
            <button
              className={styles["signout-btn"]}
              onClick={() => {
                setSignoutModal(true);
                setShowDropdown(false);
              }}
            >
              <PowerIcon width={16} height={16} strokeWidth={2.5} />
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
      <SignoutModal
        isOpen={signoutModal}
        closeSignoutModal={() => setSignoutModal(false)}
      />
    </>
  );
}
