import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const usePdfValue = () => {
  const searchParams = useSearchParams();

  const names = useMemo<string[]>(() => {
    return searchParams?.get('names')?.split(',') ?? [];
  }, [searchParams]);

  const company = useMemo<string>(() => {
    return searchParams?.get('company') ?? '';
  }, [searchParams]);

  const department = useMemo(() => {
    return searchParams?.get('department') ?? '';
  }, [searchParams]);

  return { names, company, department };
};