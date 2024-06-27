"use client";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

export default function BlogpostContent({ content }: { content: string }) {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return domLoaded ? (
    <p dangerouslySetInnerHTML={{ __html: content }}></p>
  ) : (
    <LoadingIndicator />
  );
}
