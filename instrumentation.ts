import { registerOTel } from '@vercel/otel';

export async function register() {
  registerOTel('auth-complete');
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initializeDb } = await import('@/lib/db-initialization');
    await initializeDb();
  } else {
    console.log('???????????????/');
  }
}
