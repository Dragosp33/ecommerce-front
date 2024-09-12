'use client';

import { UserInfo } from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

const ClientPage = () => {
  const currentUser = useCurrentUser();
  return (
    <div>
      <UserInfo label='Client Session' user={currentUser} />
    </div>
  );
};

export default ClientPage;
