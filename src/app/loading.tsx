import LoadingIndicator from "@/components/LoadingIndicator";
import React from "react";

export default function loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingIndicator />
    </div>
  );
}
