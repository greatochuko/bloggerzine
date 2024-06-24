"use client";

import React, { useState } from "react";
import styles from "@/styles/Header.module.css";
import MobileNav from "./MobileNav";
import { Rubik } from "next/font/google";
import MainNav from "./MainNav";

const rubik = Rubik({ subsets: ["latin"] });

export default function Header() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className={styles.header}>
      <MainNav openMobileNav={() => setMobileNav(true)} />
      <MobileNav
        isOpen={mobileNav}
        closeMobileNav={() => setMobileNav(false)}
      />
    </header>
  );
}
