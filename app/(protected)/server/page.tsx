import { auth } from '@/auth';
import { UserInfo } from '@/components/user-info';

const page = async () => {
  const session = await auth();

  return (
    <div>
      <UserInfo label='Server Session' user={session?.user} />
    </div>
  );
};

export default page;
