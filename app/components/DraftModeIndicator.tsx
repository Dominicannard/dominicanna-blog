"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DraftModeIndicator({ branch }: { branch: string | undefined }) {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const isDraftMode = searchParams.get('draft') === 'true';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isDraftMode) {
    return null;
  }

  return (
    <div>
      Draft mode ({branch}){' '}
      <form method="POST" action="/preview/end">
        <button>End preview</button>
      </form>
    </div>
  );
}
