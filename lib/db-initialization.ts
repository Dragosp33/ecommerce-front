import clientPromise from './mongodb';

export async function initializeDb() {
  const client = await clientPromise;
  const db = client.db();
  await db
    .collection('products')
    .createIndex({ 'variants.SKU': 1 }, { unique: true, sparse: true });

  console.log('Database initialized');
  //isInitialized = true; // Set to true after initialization
}

export function logServer() {
  console.log('??????? edge runtime');
}
