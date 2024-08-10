import { user } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { EnterIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { FaExclamation } from 'react-icons/fa';
import { ContinueButton, SwitchButton } from './buttons';

export const VerifySession = async () => {
  const currentUser = await user();
  console.log({ currentUser });
  return (
    <Card className='max-w-[600px] mx-auto'>
      <CardHeader>
        <div className='flex flex-column my-2 self-center'>
          <p className='text-2xl text-center font-semibold'>
            You are currently logged in as {currentUser?.name}
          </p>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> Email </p>
          <p className='truncate text-xs max-w-[150px] font-mono p-1 bg-slate-100 rounded-md dark:bg-slate-800'>
            {currentUser?.email}
          </p>
        </div>

        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> Role </p>
          <p className='truncate text-xs max-w-[150px] font-mono p-1 bg-slate-100 rounded-md dark:bg-slate-800'>
            {currentUser?.role}
          </p>
        </div>
        {currentUser?.role == 'USER' && (
          <div className='flex flex-row items-start p-3'>
            <div>
              <Badge variant={'destructive'} className='w-fit p-0.5 mr-2'>
                <FaExclamation className='w-2 h-2' />
              </Badge>
            </div>
            <div>
              <p className='text-sm'>
                You do not have privileges to access the control panel, please
                switch to a privileged account.
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className='flex justify-between'>
        {currentUser?.role !== 'USER' ? (
          <>
            <SwitchButton />
            <ContinueButton />
          </>
        ) : (
          <SwitchButton full />
        )}
      </CardFooter>
    </Card>
  );
};
