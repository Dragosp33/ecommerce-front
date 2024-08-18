'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { ExitIcon, EnterIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from '@/components/auth/logout-button';
import { LoginButton } from './login-button';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback>
            {' '}
            <FaUser />{' '}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <LogoutButton>
            <DropdownMenuItem>
              <ExitIcon className='w-4 h-4 mr-2' />
              Log out{' '}
            </DropdownMenuItem>
          </LogoutButton>
        ) : (
          <LoginButton asChild>
            <DropdownMenuItem>
              <EnterIcon className='w-4 h-4 mr-2' />
              Log in
            </DropdownMenuItem>
          </LoginButton>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
