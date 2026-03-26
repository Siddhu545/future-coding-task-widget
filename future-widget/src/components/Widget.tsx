import { useState, useMemo } from "react";
import type { Product } from "../types/offer";
import { Card } from "./Card";
import styles from "../assets/styles/Widget.module.css";

interface WidgetProps {
  offers: Product[];
}

type SortKey = "price-asc" | "price-desc" | "discount" | "popularity" | "relevance";

interface Filters {
  inStock: boolean;
  prime: boolean;
  hasDiscount: boolean;
}

export const Widget = ({ offers }: WidgetProps) => {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("price-asc");
  const [filters, setFilters] = useState<Filters>({
    inStock: false,
    prime: false,
    hasDiscount: false,
  });

  const toggleFilter = (key: keyof Filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const processed = useMemo(() => {
    let result = [...offers];

    // Search 
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.offer.name.toLowerCase().includes(q) ||
          p.merchant.name.toLowerCase().includes(q),
      );
    }

    // Filters 
    if (filters.inStock) result = result.filter((p) => p.offer.in_stock);
    if (filters.prime) result = result.filter((p) => p.shipping.prime);
    if (filters.hasDiscount)
      result = result.filter(
        (p) => p.offer.percentage_saving !== null && p.offer.percentage_saving > 0,
      );

    // Sort 
    result.sort((a, b) => {
      switch (sortKey) {
        case "price-asc":
          return parseFloat(a.offer.price) - parseFloat(b.offer.price);
        case "price-desc":
          return parseFloat(b.offer.price) - parseFloat(a.offer.price);
        case "discount":
          return (b.offer.percentage_saving ?? 0) - (a.offer.percentage_saving ?? 0);
        case "popularity":
          return b.click_count_weekly - a.click_count_weekly;
        case "relevance":
          return b.score - a.score;
        default:
          return 0;
      }
    });

    return result;
  }, [offers, query, sortKey, filters]);

  const bestPrice = Math.min(...offers.map((p) => parseFloat(p.offer.price)));

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={styles.container}>
      {/* ── Header ─── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Xbox One S</span>
          <span className={styles.subtitle}>
            {processed.length} of {offers.length} offers
          </span>
        </div>
      </div>

      {/* ── Controls ─── */}
      <div className={styles.controls}>
        {/* Search */}
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            className={styles.search}
            type="text"
            placeholder="Search product or merchant…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        {/* Sort */}
        <div className={styles.sortWrap}>
          <svg className={styles.sortIcon} viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <select
            className={styles.sort}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="discount">Biggest Discount</option>
            <option value="popularity">Most Popular</option>
            <option value="relevance">Best Match</option>
          </select>
        </div>

        {/* Filters */}
        <div className={styles.filterGroup}>
          <button
            className={`${styles.filterChip} ${filters.inStock ? styles.chipActive : ""}`}
            onClick={() => toggleFilter("inStock")}
          >
            <span className={styles.chipDot} />
            In Stock
          </button>
          <button
            className={`${styles.filterChip} ${filters.prime ? styles.chipActive : ""}`}
            onClick={() => toggleFilter("prime")}
          >
            <span className={styles.chipDot} />
            Prime
          </button>
          <button
            className={`${styles.filterChip} ${filters.hasDiscount ? styles.chipActive : ""}`}
            onClick={() => toggleFilter("hasDiscount")}
          >
            <span className={styles.chipDot} />
            On Sale
          </button>
          {activeFilterCount > 0 && (
            <button
              className={styles.clearFilters}
              onClick={() => setFilters({ inStock: false, prime: false, hasDiscount: false })}
            >
              Clear {activeFilterCount}
            </button>
          )}
        </div>
      </div>

      {/* ── Column headers ── */}
      <div className={styles.tableHead}>
        <span />
        <span>Product</span>
        <span>Merchant</span>
        <span />
        <span>Price</span>
      </div>

      {/* ── Rows ─── */}
      <div className={styles.list}>
        {processed.length === 0 ? (
          <div className={styles.empty}>
            <span>No offers match your filters.</span>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setQuery("");
                setFilters({ inStock: false, prime: false, hasDiscount: false });
              }}
            >
              Reset all
            </button>
          </div>
        ) : (
          processed.map((product) => (
            <Card
              key={product.id}
              title={product.offer.name}
              price={parseFloat(product.offer.price)}
              currency={product.offer.currency_iso}
              imgURL={product.image || product.model_image}
              merchantUrl={product.offer.link}
              merchantName={product.merchant.name}
              merchantLogo={product.merchant.logo_url}
              inStock={product.offer.in_stock}
              isPrime={product.shipping.prime}
              savingLabel={product.offer.percentage_saving_label}
              savingPct={product.offer.percentage_saving}
              promos={product.promos}
              isBest={parseFloat(product.offer.price) === bestPrice}
            />
          ))
        )}
      </div>
    </div>
  );
};