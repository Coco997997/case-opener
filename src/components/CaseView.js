import React, { useMemo, useState, useRef } from "react";
import styles from "./CaseView.module.css";
import { getSkinById } from "../data/cases";
import BoxOpenAnimation from "./BoxOpenAnimation";
import CaseModeButtons from "./CaseModeButtons";
import SkinWearMenu from "./SkinWearMenu";

// Funkcja do generowania domyślnej taśmy podglądowej (np. na start, gdy rollSkins puste)
function getDefaultRoll(caseSkins, length = 30) {
  if (!caseSkins || caseSkins.length === 0) return [];
  const arr = [];
  for (let i = 0; i < length; ++i) {
    arr.push({
      ...getSkinById(caseSkins[Math.floor(Math.random() * caseSkins.length)].id)
    });
  }
  return arr;
}

export default function CaseView({
  kase,
  onBack,
  onOpen,
  openResult,
  isOpening,
  rollSkins,
  onAnimationFinish,
  winningIndex,
  mode,
  setMode,
  casePrice = 0,
  caseSkins = [],
  normalPrice = 0,
  jesterPrice = 0
}) {
  // --- POWIADOMIENIE O WYGRANEJ ---
  const [winData, setWinData] = useState(null);
  const notifyTimeout = useRef();

  // --- STAN NAJAZDU NA SKINA ---
  const [hoveredSkin, setHoveredSkin] = useState(null);

  // Funkcja wywoływana po animacji (przekaż ją jako onFinish do BoxOpenAnimation)
  function handleAnimationFinish() {
    if (rollSkins && typeof winningIndex === "number" && rollSkins[winningIndex]) {
      const skin = rollSkins[winningIndex];
      setWinData({
        image: skin.image,
        name: skin.name,
        price: skin.price
      });
      clearTimeout(notifyTimeout.current);
      notifyTimeout.current = setTimeout(() => setWinData(null), 3000);
    }
    if (onAnimationFinish) onAnimationFinish();
  }

  const shownRollSkins = useMemo(
    () =>
      Array.isArray(rollSkins) && rollSkins.length > 0
        ? rollSkins
        : getDefaultRoll(caseSkins, 30),
    [rollSkins, caseSkins]
  );

  const shownWinningIndex =
    isOpening && typeof winningIndex === "number" && winningIndex >= 0
      ? winningIndex
      : -1;

  // Pokazuj cenę zależnie od trybu
  const displayedPrice =
    mode === "jester"
      ? jesterPrice
      : normalPrice;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <button className={styles.back} onClick={onBack}>
          &lt; Back to cases
        </button>
        <div>
          {/* <h2 className={styles.caseName}>{kase.name}</h2>
          <div className={styles.casePrice}>{Number(displayedPrice).toFixed(2)}zł</div> */}
        </div>
      </div>
      {/* Taśma - zawsze pokazuje ostatnią rollSkins albo podglądową */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 12
      }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.6rem",
            color: "#fff",
            letterSpacing: 0.5,
            textShadow: "0 2px 8px #101c36bb"
          }}
        >
          {kase.name}
        </div>
        <div
          style={{
            color: "#4e7abf",
            fontWeight: 600,
            fontSize: "1.15rem",
            marginTop: 2
          }}
        >
          {Number(displayedPrice).toFixed(2)}zł
        </div>
      </div>
      <div className={styles.tapeFrame}>
        <BoxOpenAnimation
          rollSkins={shownRollSkins}
          winningIndex={shownWinningIndex}
          isOpening={isOpening}
          onFinish={handleAnimationFinish}
        />
      </div>
      {winData && (
        <div
          style={{
            position: "fixed",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            background: "#20243b",
            color: "#fff",
            borderRadius: 14,
            boxShadow: "0 8px 32px #0007",
            padding: "18px 30px",
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: "1.18rem",
            fontWeight: 600,
            border: "2px solid #38aaff"
          }}
        >
          <img
            src={winData.image}
            alt={winData.name}
            style={{ height: 56, width: "auto", borderRadius: 10, background: "#222", marginRight: 10 }}
          />
          <span>
            Wygrałeś: <span style={{ color: "#ffe066" }}>{winData.name}</span>
            <br />
            <span style={{ color: "#50e890", fontWeight: 700 }}>{winData.price} zł</span>
          </span>
        </div>
      )}
      <div className={styles.openBlock}>
        <div className={styles.openRow}>
          <button
            className={styles.openBtn}
            onClick={onOpen}
            disabled={isOpening}
          >
            {isOpening
              ? "Opening..."
              : `Open for ${Number(displayedPrice).toFixed(2)}zł`}
          </button>
          <div className={styles.jesterRight}>
            <CaseModeButtons mode={mode} setMode={setMode} />
          </div>
        </div>
      </div>
      <div className={styles.contentsHeader}>Case contents</div>
      <div className={styles.contentsGrid}>
        {caseSkins.map((skin) => {
          const data = getSkinById(skin.id);
          return (
            <div
              key={skin.id}
              className={styles.skinTile}
              onMouseEnter={() => setHoveredSkin(data)}
              onMouseLeave={() => setHoveredSkin(null)}
              style={{ position: "relative" }}
            >
              <div className={styles.skinChance}>
                {typeof skin.chance === "number" ? skin.chance.toFixed(3) : "?"}%
              </div>
              <img src={data.image} alt={data.name} />
              <div className={styles.skinName}>{data.name}</div>
              {hoveredSkin && hoveredSkin.id === data.id && data.wears && (
                  <SkinWearMenu wears={data.wears} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
