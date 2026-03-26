import type { CardProps } from "../types/card";
import styles from "../assets/styles/Card.module.css";

export const Card = ({
  title,
  price,
  currency,
  imgURL,
  merchantUrl,
  merchantName,
  merchantLogo,
  isBest,
  inStock,
  isPrime,
  savingLabel,
  savingPct,
  promos = [],
}: CardProps) => {
  return (
    <div className={`${styles.card} ${isBest ? styles.best : ""} ${!inStock ? styles.outOfStock : ""}`}>
      {/* ── Image ─── */}
      <div className={styles.imageBox}>
        <img src={imgURL} alt={title} className={styles.image} />
        {!inStock && <div className={styles.outOfStockOverlay}>Out of stock</div>}
      </div>

      {/* ── Name + badges ──── */}
      <div className={styles.body}>
        <p className={styles.productName}>{title}</p>

        <div className={styles.badgeRow}>
          {isBest && <span className={`${styles.badge} ${styles.badgeBest}`}>Best price</span>}
          {savingPct !== null && savingPct !== undefined && savingPct > 0 && (
            <span className={`${styles.badge} ${styles.badgeSaving}`}>
              {savingLabel ?? `−${savingPct}%`}
            </span>
          )}
          {isPrime && (
            <span className={`${styles.badge} ${styles.badgePrime}`}>Prime</span>
          )}
          {promos.map((promo, i) => (
            <span key={i} className={`${styles.badge} ${styles.badgePromo}`}>
              {promo.display_value}
            </span>
          ))}
        </div>
      </div>

      {/* ── Merchant ─── */}
      <div className={styles.merchantCell}>
        {merchantLogo ? (
          <img src={merchantLogo} alt={merchantName} className={styles.merchantLogo} />
        ) : null}
        <span className={styles.merchantName}>{merchantName}</span>
      </div>

      {/* ── Stock indicator ──── */}
      <div className={styles.stockCell}>
        <span className={`${styles.stockDot} ${inStock ? styles.dotIn : styles.dotOut}`} />
        <span className={styles.stockLabel}>{inStock ? "In stock" : "Out"}</span>
      </div>

      {/* ── Price + CTA ─── */}
      <div className={styles.right}>
        <span className={`${styles.price} ${isBest ? styles.bestPrice : ""}`}>
          {currency} {price.toFixed(2)}
        </span>
        <a
          href={merchantUrl}
          target="_blank"
          rel="noreferrer"
          className={`${styles.buyBtn} ${!inStock ? styles.buyBtnDisabled : ""}`}
          aria-disabled={!inStock}
        >
          {inStock ? "Buy now ↗" : "View ↗"}
        </a>
      </div>
    </div>
  );
};