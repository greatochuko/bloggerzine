"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  replace ? router.replace(to) : router.push(to + `?redirect=${pathname}`);

  return null;
}
