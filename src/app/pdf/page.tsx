'use client'

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Pdf() {
  const searchParams = useSearchParams();

  const names = useMemo<string[]>(() => {
    return searchParams?.get('names')?.split(',') ?? [];
  }, [searchParams]);

  const company = useMemo<string>(() => {
    return searchParams?.get('company') ?? '';
  }, [searchParams]);

  return (
    <div>
      <div>
        {names.map((name, key) => (
          <div key={key}>{name}</div>
        ))}
      </div>
      <div>{company}</div>
    </div>
  );
}