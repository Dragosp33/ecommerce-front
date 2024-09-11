import Link from 'next/link';
import { IoMdSad } from 'react-icons/io';

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <IoMdSad className='w-24 h-24' />
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>Could not find the requested items.</p>
      <Link
        href='/'
        className='mt-4 rounded-md dark:bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
      >
        Go Home
      </Link>
    </main>
  );
}
