"use client";
import React, { useState } from "react";
import styles from "@/styles/Header.module.css";
import MobileNav from "./MobileNav";
import { Rubik } from "next/font/google";
import MainNav from "./MainNav";
import { User } from "@/services/userServices";

const rubik = Rubik({ subsets: ["latin"] });

export default function Header({ user }: { user: User | null }) {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className={`${styles.header} ${rubik.className}`}>
      <MainNav openMobileNav={() => setMobileNav(true)} user={user} />
      <MobileNav
        user={user}
        isOpen={mobileNav}
        closeMobileNav={() => setMobileNav(false)}
      />
    </header>
  );
}
