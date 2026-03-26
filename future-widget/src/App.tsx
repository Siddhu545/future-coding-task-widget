
import { useEffect, useState } from "react";
import { fetchOffers } from "./api/fetchOffers";
import { Widget } from "./components/Widget";
import type { Product } from "./types/offer";

const App = () => {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOffers()
      .then(setOffers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


  console.log(offers)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <Widget offers={offers} />;
};

export default App;
