const BASE_URL = "http://localhost:8000";

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.products;
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.product;
};


