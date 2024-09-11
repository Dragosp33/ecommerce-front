import clientPromise from '@/lib/mongodb';
import { CartProduct } from '@/lib/types';
import mongoose from 'mongoose';

export async function updateDbOrder(
  userId: string,
  lineItems: any[],
  amountTotal: Number
) {}

export async function createDbOrder(
  userId: string,
  lineItems: any[],
  amountTotal: number,
  amountSubTotal: number
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    //const variants = await db.collection
    const queryConditions = lineItems.map((item) => ({
      productId: item.productId,
      'variants.SKU': item.SKU,
    }));

    // Construct the query
    const variants = await db
      .collection('yourVariantsCollection')
      .find({
        $or: queryConditions,
      })
      .toArray();

    console.log(variants);
    const order = await db.collection('orders').insertOne({
      userId: new mongoose.Types.ObjectId(userId),
      products: variants,
      status: 'paid',
      amountTotal: amountTotal,
      amountSubTotal: amountSubTotal,
      createdAt: new Date(),
    });
  } catch {
    console.log('Error....introducing order...');
  }
}

export async function getDBTEST(lineItems: any[]) {
  // Construct the query
  const client = await clientPromise;
  const db = client.db();
  // Convert the lineItems array to handle ObjectId correctly
  const lineItemsObjectIds = lineItems.map((item) => ({
    productId: new mongoose.Types.ObjectId(item.productId),
    SKU: item.SKU,
  }));

  const results = await db
    .collection('products')
    .aggregate([
      {
        // Match products that have the specified productIds
        $match: {
          _id: { $in: lineItemsObjectIds.map((item) => item.productId) },
        },
      },
      {
        // Add a new field that filters the variants array by matching SKU
        $addFields: {
          matchingVariants: {
            $filter: {
              input: '$variants', // Input array to filter
              as: 'variant',
              cond: {
                $in: [
                  '$$variant.SKU',
                  lineItemsObjectIds.map((item) => item.SKU), // List of SKUs to match against
                ],
              },
            },
          },
        },
      },
      {
        // Only keep products that have matching variants
        $match: {
          'matchingVariants.0': { $exists: true }, // Check if matchingVariants array is not empty
        },
      },
      {
        // Project the fields you want in the final result
        $project: {
          _id: 1,
          productId: 1,
          matchingVariants: 1,
        },
      },
    ])
    .toArray();

  console.log('ooooooooooooooooook ', results);
  return results;
  //console.log('VARIANTS ARE ', results[0].matchingVariants);
}
