import React from "react";
import styles from "./InventoryDock.module.css";

export default function InventoryDock({ count, onToggle, isOpen }) {
  return (
    <div className={styles.dock} style={isOpen ? { pointerEvents: "none", opacity: 0.5 } : {}}>
      <button className={styles.btn} onClick={onToggle}>
        <svg height="20" width="26" viewBox="0 0 26 20" className={styles.icon}>
          <rect x="2" y="7" width="20" height="7" rx="2" fill="#B0C4DE"/>
          <rect x="22" y="8" width="3" height="5" rx="1" fill="#B0C4DE"/>
        </svg>
        <span className={styles.label}>YOUR ITEMS</span>
        <span className={styles.count}>{count}</span>
      </button>
    </div>
  );
}
