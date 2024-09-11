const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getCustomerInfo } from '@/data/User';
import { user } from '@/lib/auth';
import { CartProduct } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

/*const buildLineItems = (item: any) => {
  return {
    amount: item.amount, // Amount in cents
    reference: item.id, // Unique reference for the item in the scope of the calculation
  };
};*/
function buildLineItems(items: CartProduct[]) {
  return items.map((item: CartProduct) => ({
    price_data: {
      currency: 'usd', // Change to your currency
      product_data: {
        name: item.title, // Product name
        images: [item.thumbnail], // Product image URL (optional)
        metadata: { SKU: item.SKU },
      },

      unit_amount: Number(item.price) * 100, // Stripe expects amount in cents
    },
    //metadata: { SKU: item.SKU },
    quantity: item.quantity,
  }));
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await user();
    if (!currentUser || !currentUser.email || !currentUser.id) {
      return new Response(JSON.stringify({ error: 'Not authorized' }), {
        status: 403,
      });
    }
    console.log('welcome checkout session');
    const cusInfo = await getCustomerInfo(currentUser.id);
    if (!cusInfo) {
      return new Response(JSON.stringify({ error: 'Not authorized' }), {
        status: 403,
      });
    }

    const req_body = await req.json();
    const origin = req.headers.get('origin');
    console.log({ req_body });
    // Create Checkout Sessions from body params.
    const { items, customer } = req_body;
    // console.log(items, customer);
    const lineItems = buildLineItems(items);
    const k = items.map((item: any) => {
      return {
        productId: k.productId,
        SKU: k.SKU,
        quantity: item.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      //customer: customer.id,

      line_items: lineItems.map((item: any) => item),

      mode: 'payment',
      success_url: `${origin}/cart?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: 'required',
      //
      //customer_update: {},
      //customer_creation: 'always',
      //customer: 'cus_QnxsvDpsB64LMT',
      customer: cusInfo.customerId,

      customer_update: { shipping: 'auto' },
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
      metadata: {
        userId: currentUser.id,
        products: JSON.stringify([...k]),
      },
    });

    console.log({ session: session.url });
    //session.set({success})
    //session.success_url = `${session.success_url}&sess=${session.id}`;
    console.log(session.success_url);
    // redirect(session.url);
    return new NextResponse(
      JSON.stringify({ url: session.url, id: session.id }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ error: err }), {
      status: 400,
    });
    /*return Response.error(err.statusCode || 500).json(
      err.message || 'Checkout error'
    );*/
  }
}
