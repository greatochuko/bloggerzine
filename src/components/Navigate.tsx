"use client";
import { useRouter } from "next/router";

export default function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) {
  const router = useRouter();

  replace ? router.replace(to) : router.push(to);

  return null;
}
