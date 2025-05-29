import React from "react";
import styles from "./CaseList.module.css";

export default function CaseList({ cases, onCaseClick }) {
  return (
    <div className={styles.grid}>
      {cases.map((c) => (
        <div
          key={c.id}
          className={styles.case}
          onClick={() => onCaseClick(c)}
        >
          <img src={c.image} alt={c.name} />
          <div className={styles.title}>{c.name}</div>
          <div className={styles.price}>
            {Number(
              c.normal_price ?? c.price ?? 0
            ).toFixed(2)} zł
          </div>
        </div>
      ))}
    </div>
  );
}
