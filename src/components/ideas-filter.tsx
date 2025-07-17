'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface IdeasFilterProps {
  from: number;
  to: number;
  total: number;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const SORT_OPTIONS = ['newest', 'oldest'];

export function IdeasFilter(props: IdeasFilterProps) {
  const { from, to, total } = props;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [pageSize, setPageSize] = useState(searchParams.get('size') ?? 10);
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'newest');

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
    const params = new URLSearchParams(searchParams);
    params.set('size', newPageSize);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort);
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSort);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-full max-w-7xl items-center justify-between">
      <span className="text-muted-foreground">
        Showing {from} - {to} of {total}
      </span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Show per page:</span>
          <Select onChange={handlePageSizeChange} value={pageSize}>
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span>Sort by:</span>
          <Select onChange={handleSortChange} value={sort}>
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

function Select({
  children,
  className = '',
  ...props
}: React.ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'appearance-none rounded-full border bg-background px-4 py-2 pr-10 capitalize focus:outline-none focus:ring-2',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
        <svg
          aria-hidden="true"
          className="size-6 text-foreground-secondary"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>Open dropdown</title>
          <polygon points="5,6 15,6 10,14" />
        </svg>
      </span>
    </div>
  );
}
