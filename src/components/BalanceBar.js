import React from "react";
import styles from "./BalanceBar.module.css";

export default function BalanceBar({ balance, onAddClick, onInventoryClick }) {
  return (
    <div className={styles.bar}>
      <span>
        <b>{balance.toFixed(2)} zł</b>
      </span>
      <button className={styles.add} onClick={onAddClick}>
        + Doładuj
      </button>
    </div>
  );
}
