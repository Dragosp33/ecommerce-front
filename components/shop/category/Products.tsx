import Link from 'next/link';

const generateVariantUrl = (variant: any) => {
  const queryParams = new URLSearchParams(variant.properties).toString();
  return `/product/${variant.productId}?${queryParams}`;
};

export async function CategoryProducts({
  name,
  params,
}: {
  name: string;
  params: any;
}) {
  console.log(params);
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/products-cat/${name}?` ||
    `http://admin.shop.localhost:3001/api/products-cat/${name}?`;

  const urlParams: string[] = [];

  // Collect the provided searchParams
  for (const [key, value] of Object.entries(params || {})) {
    console.log(key, value);
    urlParams.push(`${key}=${value}`);
  }

  console.log('URL IN PRODUCTS.TSXXXXXXXXXXXXXXXXXXXXXXX');
  console.log(url);
  const res = await fetch(url + urlParams.join('&'), {
    method: 'GET',
    next: { revalidate: 10 },
  });

  const products = await res.json();
  console.log({ products });
  if (!products) {
    return (
      <div>
        <p> Sorry, we could not find any products </p>
      </div>
    );
  }
  return (
    <div>
      {products.matchedVariants.map((variant: any) => (
        <div key={variant.SKU} className='mt-3 mb-3'>
          <h2>{variant.title}</h2>
          <Link href={generateVariantUrl(variant)}> see more </Link>
        </div>
      ))}
    </div>
  );
}

export async function CategoryByIdProducts({ id }: { id: string }) {
  let url =
    `${process.env.NEXT_PUBLIC_ADMIN_DOMAIN_URL}/api/products/${id}` ||
    `http://admin.shop.localhost:3001/api/products/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 10 },
  });
  const products = await res.json();
  console.log({ products });
  return <div>hello</div>;
}
