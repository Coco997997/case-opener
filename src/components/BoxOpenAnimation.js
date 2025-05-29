import React, { useEffect, useState, useRef } from "react";
import styles from "./BoxOpenAnimation.module.css";

// UWAGA: rollSkins MUSI być tablicą skinów (każdy skin musi mieć image, name, rarity)
export default function BoxOpenAnimation({
  rollSkins,
  winningIndex,
  onFinish,
  isOpening = false,
}) {
  if (!Array.isArray(rollSkins) || rollSkins.length < 3) {
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        Brak skinów do pokazania animacji!
      </div>
    );
  }

  const SLOT_W = 144;
  const bandOuterRef = useRef(null);
  const [outerW, setOuterW] = useState(900);

  useEffect(() => {
    function updateWidth() {
      if (bandOuterRef.current) {
        setOuterW(bandOuterRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // winningIndex decyduje co jest pod strzałką po animacji
  // Jeśli winningIndex < 0, nie animujemy, taśma stoi na początku (podgląd)
  const centerOffset =
    winningIndex >= 0
      ? (outerW / 2) - (SLOT_W / 2) - (winningIndex * SLOT_W)
      : 0;

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setAnim(false); // reset animacji na zmianę rollSkins/winningIndex
    let delay, duration;
    if (isOpening && winningIndex >= 0) {
      delay = setTimeout(() => setAnim(true), 300);
      duration = setTimeout(() => {
        if (onFinish) onFinish();
      }, 4800); // dopasuj do transition!
    }
    return () => {
      clearTimeout(delay);
      clearTimeout(duration);
    };
  }, [onFinish, rollSkins, winningIndex, isOpening]);

  return (
    <div className={styles.wrap}>
      <div className={styles.arrow}>
        <svg width="32" height="20" viewBox="0 0 32 20">
          <polygon points="0,0 32,0 16,20" fill="#B0C4DE" />
        </svg>
      </div>
      <div className={styles.bandOuter} ref={bandOuterRef}>
        <div
          className={styles.band}
          style={{
            transform:
              isOpening && winningIndex >= 0 && anim
                ? `translateX(${centerOffset}px)`
                : "translateX(0)",
            transition:
              isOpening && winningIndex >= 0 && anim
                ? "transform 5s cubic-bezier(.23,1.12,.60,1)"
                : "none",
          }}
        >
          {rollSkins.map((skin, i) => (
            <div className={styles.slot} key={i}>
              <img src={skin.image} alt={skin.name} />
              <div className={styles.sname}>{skin.name}</div>
              <div className={styles.srar}>{skin.rarity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
