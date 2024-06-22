"use client";
import { useUserContext } from "@/context/UserContext";
import React from "react";
import Navigate from "./Navigate";

export default function Authenticate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserContext();
  return user ? children : <Navigate to="login" />;
}
