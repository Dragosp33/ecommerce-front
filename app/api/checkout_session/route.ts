const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { user } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { permanentRedirect } from 'next/navigation';
import { NextResponse } from 'next/server';

const buildLineItems = (item: any) => {
  return {
    amount: item.amount, // Amount in cents
    reference: item.id, // Unique reference for the item in the scope of the calculation
  };
};

export async function POST(req: Request) {
  const currentUser = await user();
  if (!currentUser || !currentUser.email) {
    return new Response(JSON.stringify({ error: 'Not authorized' }), {
      status: 403,
    });
  }

  try {
    const req_body = await req.json();
    console.log({ req_body });
    // Create Checkout Sessions from body params.
    const { items, customer } = req_body;
    console.log(items, customer);
    const session = await stripe.checkout.sessions.create({
      //customer: customer.id,
      customer_email: currentUser.email,
      line_items: buildLineItems(items),

      mode: 'payment',
      cancel_url: `${process.env.payment}/response?canceled=true`,
      success_url: `${process.env.payment}/response?success=true`,
      billing_address_collection: 'required',
      //customer_update: { shipping: 'auto' },

      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: [
          'AT',
          'BE',
          'BG',
          'HR',
          'CY',
          'CZ',
          'DK',
          'EE',
          'FI',
          'FR',
          'DE',
          'GR',
          'HU',
          'IE',
          'IT',
          'LV',
          'LT',
          'LU',
          'MT',
          'NL',
          'PL',
          'PT',
          'RO',
          'SK',
          'SI',
          'ES',
          'SE',
          'GB',
        ],
      },
    });

    console.log({ session: session.url });
    // redirect(session.url);
    return new NextResponse(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 400,
    });
    /*return Response.error(err.statusCode || 500).json(
      err.message || 'Checkout error'
    );*/
  }
}
