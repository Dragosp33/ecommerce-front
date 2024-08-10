'use server';

import { VerifySession } from '@/components/auth/verify-session/main';
import { user } from '@/lib/auth';
import { Suspense } from 'react';

const Page = async () => {
  // const currentUser = await user();
  return (
    <div>
      <Suspense fallback={<div> LOADINGGGG </div>}>
        <VerifySession />
      </Suspense>
    </div>
  );
};

export default Page;
