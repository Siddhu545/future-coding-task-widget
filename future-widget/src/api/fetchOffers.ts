

import type { Product } from "../types/offer";

export const fetchOffers = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://search-api.fie.future.net.uk/widget.php?model_name=xbox_one_s&area=US&rows=10",
  );
  if (!res.ok) throw new Error("Failed to fetch offers");

  const data = await res.json();
  return data.widget.data.offers as Product[];
};
