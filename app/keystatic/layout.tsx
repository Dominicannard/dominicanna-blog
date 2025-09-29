import KeystaticApp from './keystatic';
import { cookies, draftMode } from 'next/headers';

export default async function RootLayout() {
  const draftModeInstance = await draftMode();
  const { isEnabled } = draftModeInstance;
  const cookiesStore = await cookies();

  return <>
    <KeystaticApp />
    {isEnabled && (
      <div>
        Draft mode ({cookiesStore.get('ks-branch')?.value}){' '}
        <form method="POST" action="/preview/end">
          <button>End preview</button>
        </form>
      </div>
    )}
  </>;
}
