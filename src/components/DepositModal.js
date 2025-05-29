import React, { useState } from "react";
import styles from "./DepositModal.module.css";

export default function DepositModal({ onClose, onDeposit }) {
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    const val = Number(amount);
    if (val > 0) {
      onDeposit(val);
      onClose();
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2>Doładuj portfel</h2>
        <input
          type="number"
          placeholder="Kwota (zł)..."
          min={1}
          max={10000}
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className={styles.input}
        />
        <button
          className={styles.deposit}
          onClick={handleDeposit}
          disabled={Number(amount) < 1}
        >
          Doładuj
        </button>
      </div>
    </div>
  );
}
