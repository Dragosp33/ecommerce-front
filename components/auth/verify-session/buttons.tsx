'use client';

import { logout, SwitchAccounts } from '@/actions/logout';

import { Button } from '@/components/ui/button';
import { EnterIcon } from '@radix-ui/react-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const SwitchButton = ({ full }: { full?: boolean }) => {
  const onClick = async () => {
    await logout();
  };
  return (
    <Button
      variant='outline'
      className={full ? 'flex-1' : ''}
      onClick={onClick}
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

  const continueToPortal = async () => {
    const response = await fetch(
      `${process.env.ADMIN_DOMAIN_URL}/api/verified-session`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    console.log(response);
    if (response.redirected) {
      window.location.href = response.url;
    }
  };
  return (
    <Button
      onClick={() => {
        router.push(callback || 'localhost:3001/dashboard');
      }}
    >
      Continue <EnterIcon className='w-4 h-4 ml-2' />
    </Button>
  );
};
