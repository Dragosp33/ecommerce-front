'use server';

import Loading from '@/app/loading';
import { VerifySession } from '@/components/auth/verify-session/main';

import { Suspense } from 'react';

const Page = async () => {
  // const currentUser = await user();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <VerifySession />
      </Suspense>
    </div>
  );
};

export default Page;
