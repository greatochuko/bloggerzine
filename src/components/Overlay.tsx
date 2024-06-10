import React from "react";
import styles from "@/styles/Overlay.module.css";

export default function Overlay({
  children,
  closeOverlay,
  isOpen,
}: {
  children: React.ReactNode;
  closeOverlay: () => void;
  isOpen: boolean;
}) {
  return (
    <div
      className={`${styles["overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={closeOverlay}
    >
      {children}
    </div>
  );
}
