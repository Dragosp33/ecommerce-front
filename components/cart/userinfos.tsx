import { user } from '@/lib/auth';
import { getCustomer } from '@/lib/stripe';

export async function UserInfoCard() {
  const currentUser = await user();
  if (!currentUser || !currentUser.id) {
    return <div> not logged in. </div>;
  }
  const customer = await getCustomer(currentUser?.id);
  console.log('USERINFOOOOOOOOOOOOOOO: ', customer);
  if (!customer || !customer.id) {
    return null;
  }
  return (
    <div>
      <h2> customer Id: {customer.id}</h2>
    </div>
  );
}
