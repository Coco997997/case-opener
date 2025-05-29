import React from "react";
import styles from "./CaseModeButtons.module.css";

export default function CaseModeButtons({ mode, setMode }) {
  return (
    <div className={styles.modeButtonsWrap}>
      <button
        className={`${styles.modeBtn} ${mode === "jester" ? styles.active : ""}`}
        title="Jester Mode"
        onClick={() => setMode(mode === "jester" ? "normal" : "jester")}
        tabIndex={0}
      >
        {/* Ikona Jokera */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="11" fill="#1D1F4B"/>
          <path d="M7 15C7 13 9.5 13 9.5 15" stroke="#FFF" strokeWidth="1"/>
          <path d="M15 15C15 13 12.5 13 12.5 15" stroke="#FFF" strokeWidth="1"/>
          <ellipse cx="8.5" cy="10" rx="0.7" ry="1" fill="#FFF"/>
          <ellipse cx="13.5" cy="10" rx="0.7" ry="1" fill="#FFF"/>
          <circle cx="6" cy="7" r="2" fill="#FFCD1A" stroke="#FFF" strokeWidth="1"/>
          <circle cx="16" cy="7" r="2" fill="#FF3A3A" stroke="#FFF" strokeWidth="1"/>
        </svg>
      </button>
    </div>
  );
}
