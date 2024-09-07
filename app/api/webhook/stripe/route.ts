import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { fulfillOrder } from '@/actions/fulfill-order';

const stripe = require('stripe')(process.env.STRIPE_PRIVATE);

const secret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get('stripe-signature');

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      if (!event.data.object.customer_details.email) {
        throw new Error(`missing user email, ${event.id}`);
      }
      fulfillOrder(event.data.object.id);
      //console.log('EVENT DATA: ', event.data.object);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 }
    );
  }
}
