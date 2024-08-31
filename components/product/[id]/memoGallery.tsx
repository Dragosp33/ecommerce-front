'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';

/*interface GalleryProps {
  images: IImage[];
}*/

const MemoGallery = ({ images }: { images: any[] }) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  console.log('Memo Gallery rerendered');

  // Reset current index when images change
  useEffect(() => {
    setCurrent(0);
    mainApi?.scrollTo(0);
    thumbnailApi?.scrollTo(0);
  }, [images, mainApi, thumbnailApi]);

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem key={index} className='relative aspect-square w-full'>
          <Image
            src={image}
            alt={`Carousel Main Image ${index + 1}`}
            fill
            sizes='(max-width: 768px) 99vw, (max-width: 1200px) 50vw, 33vw'
            priority={index === 0}
            className='px-4'
            style={{ objectFit: 'contain' }}
            //style={{ objectFit: 'contain', padding: '2rem' }}
          />
        </CarouselItem>
      )),
    [images]
  );

  const handleClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbnailApi) {
        return;
      }
      thumbnailApi.scrollTo(index);
      mainApi.scrollTo(index);
      setCurrent(index);
    },
    [mainApi, thumbnailApi] // Dependencies of the function
  );
  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className='relative aspect-square w-full basis-1/4'
          onClick={() => handleClick(index)}
        >
          <Image
            className={`${index === current ? 'border-2' : ''}`}
            src={image}
            fill
            alt={`Carousel Thumbnail Image ${index + 1}`}
            style={{ objectFit: 'contain' }}
            sizes='200px'
          />
        </CarouselItem>
      )),
    [images, current, handleClick]
  );

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    mainApi.on('select', handleTopSelect);
    thumbnailApi.on('select', handleBottomSelect);

    return () => {
      mainApi.off('select', handleTopSelect);
      thumbnailApi.off('select', handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  return (
    <div className='w-auto max-w-xl sm:w-auto ml-6 sm:px-6 mx-6'>
      <Carousel setApi={setMainApi}>
        <CarouselContent className='m-1'>{mainImage}</CarouselContent>
        <CarouselPrevious className='' />
        <CarouselNext className='' />
      </Carousel>
      <Carousel setApi={setThumbnailApi}>
        <CarouselContent className='m-1'>{thumbnailImages}</CarouselContent>
      </Carousel>
    </div>
  );
};

export default MemoGallery;
