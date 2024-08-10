'use client';

import { SwitchAccounts } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { EnterIcon } from '@radix-ui/react-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const SwitchButton = ({ full }: { full?: boolean }) => {
  return (
    <Button
      variant='outline'
      className={full ? 'flex-1' : ''}
      onClick={async () => {
        await SwitchAccounts();
      }}
    >
      <EnterIcon className='w-4 h-4 mr-2 rotate-180' />
      Switch{' '}
    </Button>
  );
};

export const ContinueButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get('callbackUrl');
  return (
    <Button
      onClick={() => {
        router.push(callback || '/');
      }}
    >
      Continue <EnterIcon className='w-4 h-4 ml-2' />
    </Button>
  );
};
