import React from "react";
import styles from "./SkinWearMenu.module.css";

// wears: tablica obiektów: { state, short, price }
export default function SkinWearMenu({ wears = [] }) {
  return (
    <div className={styles.menu}>
      <div>
        <div className={styles.header}>
          <span>Stan</span>
          <span>Cena</span>
        </div>
        <div className={styles.rows}>
          {wears.map(wear => (
            <div key={wear.short} className={styles.row}>
              <span className={styles.short}>{wear.short}</span>
              <span className={styles.price}>{wear.price.toFixed(2)}zł</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
