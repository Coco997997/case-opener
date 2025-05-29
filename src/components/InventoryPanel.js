import React from "react";
import styles from "./InventoryPanel.module.css";

export default function InventoryPanel({
  items,
  onSellOne,
  onSellAll,
  isOpen,
  onClose
}) {
  const total = items.reduce((s, item) => s + item.price, 0);

  return (
    <div className={`${styles.panel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <span>Ekwipunek</span>
        <button className={styles.close} onClick={onClose}>×</button>
      </div>
      {items.length === 0 ? (
        <div className={styles.empty}>Brak skinów w ekwipunku.</div>
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
                  <span className={styles.name}>
                    {item.name}{" "}
                    <b style={{ color: "#7ff", fontWeight: 500, fontSize: "0.95em" }}>
                      ({item.wearShort || "?"})
                    </b>
                  </span>
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
  );
}
