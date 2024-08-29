import { BuyButton } from '@/components/product/[id]/buttons';
import Gallery from '@/components/product/[id]/gallery';
import MemoGallery from '@/components/product/[id]/memoGallery';
import ProductDropdown from '@/components/product/[id]/properties-link';
import { notFound, redirect } from 'next/navigation';

export default async function Product({
  searchParams,
  params,
}: {
  searchParams?: Record<string, string>;
  params: { id?: string };
}) {
  console.log(searchParams, params);
  const id = params?.id || '1';
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/product/${params.id}?` ||
    `http://admin.shop.localhost:3001/api/product/${params.id}?`;
  const urlParams: string[] = [];

  // Collect the provided searchParams
  for (const [key, value] of Object.entries(searchParams || {})) {
    urlParams.push(`${key}=${value}`);
  }

  console.log({ url });
  //const res = await fetch(url, { method: 'GET' });

  const res = await fetch(url + urlParams.join('&'), { method: 'GET' });

  const parsedRes = await res.json();
  console.log(parsedRes);
  if (parsedRes.error || !parsedRes.exactMatch) {
    return notFound();
  }
  const { exactMatch, relatedVariants } = parsedRes;
  //if(product ||)

  // Check if searchParams are missing any properties present in exactMatch
  const missingParams = Object.entries(exactMatch.properties).filter(
    ([key, value]) => !searchParams?.[key]
  );

  if (missingParams.length > 0) {
    // Collect missing parameters
    for (const [key, value] of missingParams) {
      urlParams.push(`${key}=${String(value)}`);
    }

    // Redirect to the updated URL without a trailing "&"
    return redirect(`/product/${id}?${urlParams.join('&')}`);
  }

  return (
    <div className='flex flex-col md:mx-8 mx-6'>
      <div className='w-full'>
        <h1> {exactMatch.title} </h1>
      </div>
      <div className='flex w-full flex-col md:flex-row items-center'>
        <div className='w-full'>
          <MemoGallery images={exactMatch.photos} />
        </div>
        <div>
          <BuyButton />

          <ProductDropdown
            exactMatch={exactMatch}
            relatedVariants={relatedVariants}
            searchParams={searchParams}
            params={params}
          />
        </div>
      </div>
      <div>
        <p> {exactMatch.description}</p>
      </div>
      {/*}
      <div className=''>
        {Object.entries(exactMatch.properties).map(([key, value]) => (
          <p key={key}>
            {key}: {String(value)}
          </p>
        ))}

        <BuyButton />

        <ProductDropdown
          exactMatch={exactMatch}
          relatedVariants={relatedVariants}
          searchParams={searchParams}
          params={params}
        />
      </div>*/}
    </div>
  );
}
