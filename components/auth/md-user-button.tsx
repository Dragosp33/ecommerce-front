import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';
import { LoginButton } from './login-button';

export const MdUserButton = () => {
  const user = useCurrentUser();
  return (
    <div>
      {user ? (
        <LogoutButton>
          <div className='flex flex-row items-center '>
            <ExitIcon className='w-4 h-4 mr-2' />
            Log out{' '}
          </div>
        </LogoutButton>
      ) : (
        <LoginButton asChild>
          <div className='flex flex-row items-center '>
            <EnterIcon className='w-4 h-4 mr-2' />
            Log in
          </div>
        </LoginButton>
      )}
    </div>
  );
};
