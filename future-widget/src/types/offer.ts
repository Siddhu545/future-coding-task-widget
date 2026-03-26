

export interface Shipping {
  prime: boolean;
  url: string | null;
}

export interface Merchant {
  id: number;
  name: string;
  url: string;
  logo_url: string;
  territory: string;
  preference: number;
}

export interface Label {
  type: string;
  value: string;
  display_value: string;
  display_order: number;
  priority: number;
}

export interface Promo {
  type: string;
  value: string;
  display_value: string;
}

export interface Offer {
  name: string;
  price: string;
  in_stock: boolean;
  stock_quantity: number | null;
  currency_iso: string;
  currency_symbol: string;
  link: string;
  link_text: string;
  merchant_link_text: string;
  label: string;
  percentage_saving: number | null;
  percentage_saving_label: string | null;
  money_saving: number | null;
  money_saving_label: string | null;
  product_note: string | null;
  audience: string | null;
  display_name: string;
  display_labels: string;
  display_primary_label: string;
}

export interface Product {
  id: number;
  match_id: number;
  product_key: string;
  score: number;
  percentage: number;
  click_count: number;
  click_count_weekly: number;
  click_count_monthly: number;
  product_type: number;
  bundle_models: string[];
  model_matched: string[];
  requested_model: string;
  is_tenancy: boolean;
  model: string;
  model_id: number;
  an: string;
  offer: Offer; // child
  image: string;
  label_image: string | null;
  model_image: string;
  shipping: Shipping;
  merchant: Merchant;
  last_update: number;
  labels_formatted: Label[];
  tracking_pixel_url: string;
  promos: Promo[];
}

export interface Offers {
  // parent
  offers: Product[];
}
