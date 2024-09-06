import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel('shopshift');
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Nodejs runtime started.');
    const { initializeDb } = await import('@/lib/db-initialization');
    await initializeDb();
  } else {
    console.log('Server started in EDGE runtime');
  }
}
