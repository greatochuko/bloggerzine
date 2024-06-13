import React from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  console.log(searchParams);
  return <div>Search Results for "{searchParams.query}"</div>;
}
