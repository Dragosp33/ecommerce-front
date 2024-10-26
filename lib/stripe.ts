'use server';

import { getCustomerInfo, getUserById, setCustomerId } from '@/data/User';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function CreateCustomer(
  userId: string,
  email: string,
  name?: string
) {
  const customer = await stripe.customers.create({
    name: name || '',
    email: email,
  });
  await setCustomerId(userId, customer.id);
}

/**
 * Function to get the customer information from stripe based on userId in mongoDB
 * If the user is not linked to a customerId, a new Customer Account will be created.
 * @param userId - userId to get the stripe information from
 * @returns customer info from stripe - address, tax, etc.
 */
export async function getCustomer(userId: string) {
  const cusInfo = await getCustomerInfo(userId);
  if (!cusInfo) {
    const user = await getUserById(userId);
    if (!user || !user.email) {
      return null;
    }
    const newCustomer = await CreateCustomer(userId, user.email, user.name);
    return newCustomer;
  }
  const customer = await stripe.customers.retrieve(cusInfo.customerId);

  return customer;
}

export async function isFullfilledOrder(orderid: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(orderid);
    // console.log(session);
    return session.status || 'uncomplete';
  } catch {
    return 'uncomplete';
  }
}
