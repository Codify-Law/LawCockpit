"use client";

import Link from "next/link";
import { cn } from "@/lib/utils"; // Or remove if not used

interface PaginationProps {
  currentPage: number;
  totalSections: number;
  sectionsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalSections,
  sectionsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalSections / sectionsPerPage);

  if (totalPages <= 1) return null;

  const generatePages = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const pageNumbers: number[] = [];

    // Always show first page
    pageNumbers.push(1);

    // Pages around current
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    // Sort and insert ellipsis
    const sortedPages = Array.from(new Set(pageNumbers)).sort((a, b) => a - b);
    for (let i = 0; i < sortedPages.length; i++) {
      const page = sortedPages[i];
      const prevPage = sortedPages[i - 1];

      if (prevPage !== undefined && page - prevPage > 1) {
        pages.push("ellipsis");
      }

      pages.push(page);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <nav className="flex justify-center mt-8 space-x-2">
      <Link
        href={`?page=${Math.max(1, currentPage - 1)}`}
        className={cn(
          "px-3 py-2 rounded-md border text-sm",
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100"
        )}
        aria-disabled={currentPage === 1}
      >
        Previous
      </Link>

      {pages.map((item, idx) =>
        item === "ellipsis" ? (
          <span key={idx} className="px-3 py-2 text-gray-500">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={`?page=${item}`}
            className={cn(
              "px-3 py-2 rounded-md border text-sm",
              item === currentPage
                ? "bg-gray-200 font-medium"
                : "hover:bg-gray-100"
            )}
          >
            {item}
          </Link>
        )
      )}

      <Link
        href={`?page=${Math.min(totalPages, currentPage + 1)}`}
        className={cn(
          "px-3 py-2 rounded-md border text-sm",
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100"
        )}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </nav>
  );
}
