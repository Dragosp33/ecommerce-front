import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { twJoin } from 'tailwind-merge';
import { BuyButton } from './buttons';

const BuyProductCard = ({
  exactMatch,
  stock,
}: {
  exactMatch: any;
  stock: number;
}) => {
  return (
    <Card className='md:max-w-[300px]'>
      <CardHeader>
        <h1 className='text-xl font-bold text-emerald-500'>
          {' '}
          {exactMatch.price} ${' '}
        </h1>
      </CardHeader>
      <CardDescription
        className={twJoin(
          'ml-2',
          stock < 5 && 'text-red-500',
          stock < 15 && stock >= 5 && 'text-yellow-500'
        )}
      >
        {' '}
        Stock : {stock}
      </CardDescription>
      {stock < 5 && (
        <p className='text-sm font-light ml-2'>
          {' '}
          Hurry, only {stock} pieces left!
        </p>
      )}
      <CardContent className='mt-4'>
        <BuyButton />
        <p className='mt-4 text-sm font-light'>
          {' '}
          visit your cart after adding the item to continue with the payment, or
          continue shopping
        </p>
      </CardContent>
    </Card>
  );
};

export default BuyProductCard;
