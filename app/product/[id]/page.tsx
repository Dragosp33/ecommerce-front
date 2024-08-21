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
  for (const [key, value] of Object.entries(searchParams || {})) {
    console.log(`Key: ${key}, Value: ${value}`);
    url = url.concat(key).concat('=').concat(value).concat('&');
  }
  console.log({ url });
  const k = await fetch(url, { method: 'GET' });
  // console.log()
  return <div>Hello</div>;
}
