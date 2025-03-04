"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import styles from "@/styles/CustomImage.module.css";

interface CustomImageProps extends ImageProps {
  sizes: string;
}

export default function CustomImage({
  src,
  alt,
  sizes,
  ...props
}: CustomImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        {...props}
        fill
        style={{
          opacity: imageLoaded ? "1" : "0",
          visibility: imageLoaded ? "visible" : "hidden",
          transitionDuration: "100ms",
        }}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && <div className={styles["placeholder"]}></div>}
    </>
  );
}
