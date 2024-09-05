import { PiWaveSine } from 'react-icons/pi';

export default function Loading() {
  // Number of particles

  return (
    <div className='flex items-center justify-center h-screen relative'>
      <div className='w-32 h-32 bg-indigo-500 animate-blob absolute z-10'></div>
      <PiWaveSine className='w-[400px] h-[200px] absolute animate-spin' />
      <p className='z-20 '> ShopShift </p>
    </div>
  );
}
