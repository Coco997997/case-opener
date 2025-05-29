import React from "react";
import styles from "./Inventory.module.css";

export default function Inventory({
  items,
  onSellOne,
  onSellAll,
  show,
  onClose,
}) {
  const total = items.reduce((s, item) => s + item.price, 0);

  if (!show) return null;
  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <h2>Twój ekwipunek</h2>
        {items.length === 0 ? (
          <p className={styles.empty}>Brak skinów w ekwipunku.</p>
        ) : (
          <>
            <div className={styles.sellBar}>
              <div>Wartość: <b>{total.toFixed(2)} zł</b></div>
              <button
                className={styles.sellAll}
                onClick={onSellAll}
                disabled={items.length === 0}
              >
                Sprzedaj wszystko
              </button>
            </div>
            <div className={styles.list}>
              {items.map((item) => (
                <div key={item.uid} className={styles.item}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.info}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.price}>{item.price} zł</span>
                  </div>
                  <button className={styles.sell} onClick={() => onSellOne(item.uid, item.price)}>
                    Sprzedaj
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
