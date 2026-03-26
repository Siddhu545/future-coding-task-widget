import type { Promo } from "./offer";

export interface CardProps {
  title: string;
  price: number;
  currency: string;
  imgURL: string;
  merchantUrl: string;
  merchantName: string;
  merchantLogo: string;
  isBest: boolean;
  inStock: boolean;
  isPrime: boolean;
  savingLabel: string | null;
  savingPct: number | null;
  promos?: Promo[];
}