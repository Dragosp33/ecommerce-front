'use client';

import { logout } from '@/actions/logout';
import { redirect } from 'next/navigation';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await logout();
  };

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {' '}
      {children}{' '}
    </span>
  );
};

export const LoginButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    redirect('/auth/login');
  };

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {' '}
      {children}{' '}
    </span>
  );
};
