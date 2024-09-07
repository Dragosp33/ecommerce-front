import clientPromise from '@/lib/mongodb';
import { CartProduct } from '@/lib/types';

export async function updateDbOrder(
  userId: string,
  lineItems: any[],
  amountTotal: Number
) {}

export async function createDbOrder(
  userId: string,
  lineItems: CartProduct[],
  amountTotal: number,
  amountSubTotal: number
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const order = await db.collection('orders').insertOne({
      userId: userId,
      products: lineItems,
      status: 'paid',
      amountTotal: amountTotal,
      amountSubTotal: amountSubTotal,
      createdAt: new Date(),
    });
  } catch {
    console.log('Error....introducing order...');
  }
}
