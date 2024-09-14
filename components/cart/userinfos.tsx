import { user } from '@/lib/auth';
import { getCustomer } from '@/lib/stripe';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export async function UserInfoCard() {
  const currentUser = await user();
  if (!currentUser || !currentUser.id) {
    return <div> not logged in. </div>;
  }
  const customer = await getCustomer(currentUser?.id);
  console.log('USERINFOOOOOOOOOOOOOOO: ', customer);
  if (!customer || !customer.id) {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>No informations recorded...</CardTitle>
            <CardDescription>
              Don{`'t`} worry, it seems like your informations have not been
              registered, your address will be remembered after your first
              purchase.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className=''>
      <Card>
        <CardHeader>
          <CardTitle>Customer info</CardTitle>
          <CardDescription>
            Here you can see your saved shipping address. Don{`'t`} worry if
            nothing shows up, the address will be saved on your next purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {customer.shipping && customer.shipping.address && (
              <div>
                <Label htmlFor='city'>City</Label>
                <Input
                  value={customer.shipping.address.city}
                  disabled
                  name='city'
                />
                <Label htmlFor='postal_code'>ZIP Code</Label>
                <Input
                  value={customer.shipping.address.postal_code || 'not set'}
                  disabled
                  name='postal_code'
                />
                <Label htmlFor='line1'> Line 1</Label>
                <Input
                  value={customer.shipping.address.line1 || 'not set'}
                  disabled
                  name='line1'
                />
                {customer.shipping.address.line2 && (
                  <>
                    <Label htmlFor='line2'> Line 2</Label>
                    <Input
                      value={customer.shipping.address.line2 || 'not set'}
                      disabled
                      name='line2'
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
