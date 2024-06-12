import React from "react";
import styles from "@/styles/Paginator.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Paginator({ numPages }: { numPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pages = Array.from({ length: numPages }, (_, index) => index + 1);

  function nextPage() {
    if (currentPage >= pages[pages.length - 1]) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pages[currentPage].toString());
    router.push(`${pathname}?${params}`);
  }

  function prevPage() {
    if (currentPage <= 1) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pages[currentPage - 2].toString());
    router.push(`${pathname}?${params}`);
  }

  function gotoPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params}`);
  }

  return (
    <div className={styles["paginator"]}>
      <button disabled={currentPage <= 1} onClick={prevPage}>
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? styles["active"] : ""}
          onClick={() => gotoPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage >= pages[pages.length - 1]}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}
