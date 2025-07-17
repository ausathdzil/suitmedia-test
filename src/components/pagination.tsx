'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { Meta } from '@/lib/definitions';

export function Pagination({ meta }: { meta: Meta }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(Number(searchParams.get('page')) ?? 1);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    setPage(newPage);
    params.set('page', newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        aria-label="First page"
        disabled={page === 1}
        onClick={() => handlePageChange(1)}
        type="button"
      >
        <ChevronsLeftIcon />
      </Button>
      <Button
        aria-label="Previous"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        type="button"
      >
        <ChevronLeftIcon />
      </Button>
      {meta.links.slice(1, -1).map((link) => (
        <Button
          aria-label={link.label}
          data-active={link.active ? 'true' : 'false'}
          disabled={link.label === '...'}
          key={link.label}
          onClick={() => handlePageChange(Number(link.label))}
          type="button"
        >
          {link.label}
        </Button>
      ))}
      <Button
        aria-label="Next"
        disabled={page === meta.last_page}
        onClick={() => handlePageChange(page + 1)}
        type="button"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        aria-label="Last page"
        disabled={page === meta.last_page}
        onClick={() => handlePageChange(meta.last_page)}
        type="button"
      >
        <ChevronsRightIcon />
      </Button>
    </div>
  );
}

function Button({
  children,
  disabled,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      className="flex size-8 items-center justify-center rounded-lg font-medium text-sm transition-colors ease-out disabled:opacity-50 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[disabled=false]:hover:bg-primary data-[disabled=false]:hover:text-primary-foreground [&_svg]:size-4 "
      data-disabled={disabled ? 'true' : 'false'}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
