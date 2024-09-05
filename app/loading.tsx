import { PiWaveSine } from 'react-icons/pi';

export default function Loading() {
  // Number of particles

  return (
    <div className='flex items-center justify-center h-screen relative max-w-screen overflow-hidden'>
      <div className='w-32 h-32 bg-indigo-500 animate-blob absolute z-10'></div>
      <PiWaveSine className='w-[400px] h-[300px] absolute animate-rotate10Loop text-secondary-foreground' />
      <p className='z-20 '> ShopShift </p>
    </div>
  );
}
