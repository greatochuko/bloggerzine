"use client";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";

export default function Navigate({ to }: { to: string }) {
  const pathname = usePathname();

  redirect(to + `?redirect=${pathname}`);

  return null;
}
