import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { createGitHubReader } from '@keystatic/core/reader/github';

import { cache } from 'react';
import { cookies, draftMode } from 'next/headers';

export const reader = cache(async () => {
  let isDraftModeEnabled = false;
  // draftMode throws in e.g. generateStaticParams
  try {
    const draftModeInstance = await draftMode();
    isDraftModeEnabled = draftModeInstance.isEnabled;
  } catch {}

  if (isDraftModeEnabled) {
    const cookiesStore = await cookies();
    const branch = cookiesStore.get('ks-branch')?.value;

    if (branch) {
      return createGitHubReader(keystaticConfig, {
        // Replace the below with your repo org an name
        repo: 'Dominicannard/dominicanna-blog',
        ref: branch,
        // Assuming an existing GitHub app
        token: cookiesStore.get('keystatic-gh-access-token')?.value,
      });
    }
  }
  // If draft mode is off, use the regular reader
  return createReader(process.cwd(), keystaticConfig);
});
