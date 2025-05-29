import React, { useState, useEffect } from "react";
import { CASES, getSkinById } from "./data/cases";
import InventoryDock from "./components/InventoryDock";
import InventoryPanel from "./components/InventoryPanel";
import {
  getBalance,
  setBalance,
  addBalance,
  subtractBalance,
  getInventory,
  addToInventory,
  removeSkinFromInventory,
  clearInventory,
} from "./utils/localStorage";
import BalanceBar from "./components/BalanceBar";
import CaseList from "./components/CaseList";
import CaseView from "./components/CaseView";
import DepositModal from "./components/DepositModal";

export default function App() {
  const [balance, setBalanceState] = useState(getBalance());
  const [showDeposit, setShowDeposit] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [openResult, setOpenResult] = useState(null);
  const [inventory, setInventory] = useState(getInventory());
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [rollSkins, setRollSkins] = useState([]);
  const [winningIndex, setWinningIndex] = useState(0);
  const [mode, setMode] = useState("normal");

  // Szanse na wear (kolejno: FN, MW, FT, WW, BS)
  const wearChances = [0.15, 0.15, 0.4, 0.15, 0.15];

  function getRandomWearIndexCustom(wearsLength) {
    if (wearsLength === wearChances.length) {
      const rand = Math.random();
      let sum = 0;
      for (let i = 0; i < wearChances.length; ++i) {
        sum += wearChances[i];
        if (rand < sum) return i;
      }
      return wearChances.length - 1;
    }
    return Math.floor(Math.random() * wearsLength);
  }

  // Wyliczanie ceny i szans na podstawie trybu
  function getCasePriceAndChances(selectedCase, mode) {
    if (!selectedCase) return { price: 0, skins: [] };

    if (mode === "boost") {
      const price = selectedCase.price * 2;
      let skins = selectedCase.skins.map(s => ({
        ...s,
        chance: s.chance * 2
      }));
      const total = skins.reduce((sum, s) => sum + s.chance, 0);
      skins = skins.map(s => ({ ...s, chance: (s.chance / total) * 100 }));
      return { price, skins };
    }
    if (mode === "jester") {
      const skinObjs = selectedCase.skins
        .map(s => getSkinById(s.id))
        .filter(skin => skin && skin.wears && skin.wears.length > 0);
      if (skinObjs.length < 2) return { price: 0, skins: [] };
      // Używamy jester_price jeśli istnieje, w przeciwnym razie licz jak dawniej
      const price = selectedCase.jester_price !== undefined
        ? selectedCase.jester_price
        : Math.round(
            skinObjs.map(skin => skin.wears[0].price).reduce((a, b) => a + b, 0) /
            (skinObjs.length - 1)
          );
      const equalChance = 100 / skinObjs.length;
      const skins = selectedCase.skins
        .filter(s => {
          const sk = getSkinById(s.id);
          return sk && sk.wears && sk.wears.length > 0;
        })
        .map(s => ({
          ...s,
          chance: equalChance
        }));
      return { price, skins };
    }
    // NORMAL – użyj normal_price jeśli istnieje, w przeciwnym razie price
    return {
      price: selectedCase.normal_price !== undefined
        ? selectedCase.normal_price
        : selectedCase.price,
      skins: selectedCase.skins
    };
  }

  // Wyliczaj dla wybranej skrzynki i trybu
  const { price: casePrice, skins: caseSkins } = getCasePriceAndChances(selectedCase, mode);

  // Pobieraj normal_price i jester_price z wybranej skrzynki (lub undefined, jeśli nie ma)
  const normalPrice = selectedCase?.normal_price ?? selectedCase?.price ?? 0;
  const jesterPrice = selectedCase?.jester_price ?? 0;

  useEffect(() => {
    setBalance(balance);
  }, [balance]);

  const handleCaseClick = (c) => {
    setSelectedCase(c);
    setOpenResult(null);
    setRollSkins([]);
    setWinningIndex(0);
  };

  const handleOpenCase = () => {
    if (!selectedCase) return;
    if (balance < casePrice || isOpening) return;

    setBalanceState(bal => bal - casePrice);

    setIsOpening(true);

    const pool = [];
    caseSkins.forEach((s) => {
      const count = Math.round(s.chance * 10);
      for (let i = 0; i < count; ++i) pool.push(s.id);
    });
    if (pool.length === 0) caseSkins.forEach(s => pool.push(s.id));
    const resultId = pool[Math.floor(Math.random() * pool.length)];
    const wonSkin = getSkinById(resultId);

    let wearObj = { state: "", short: "", price: 0 };
    if (wonSkin && wonSkin.wears && wonSkin.wears.length > 0) {
      const wearIndex = getRandomWearIndexCustom(wonSkin.wears.length);
      wearObj = wonSkin.wears[wearIndex];
    }

    const ROLL_COUNT = 37;
    const MIN_INDEX = 18;
    const MAX_INDEX = ROLL_COUNT - 7;
    const winIdx = Math.floor(Math.random() * (MAX_INDEX - MIN_INDEX + 1)) + MIN_INDEX;
    const casePool = caseSkins.map(s => getSkinById(s.id));
    let band = [];
    for (let i = 0; i < ROLL_COUNT; ++i) {
      const skinObj = casePool[Math.floor(Math.random() * casePool.length)];
      let slotWearObj = { state: "", short: "", price: 0 };
      if (skinObj && skinObj.wears && skinObj.wears.length > 0) {
        const slotWearIndex = getRandomWearIndexCustom(skinObj.wears.length);
        slotWearObj = skinObj.wears[slotWearIndex];
      }
      band.push({
        ...skinObj,
        wear: slotWearObj.state,
        wearShort: slotWearObj.short,
        price: slotWearObj.price
      });
    }
    band[winIdx] = {
      ...wonSkin,
      wear: wearObj.state,
      wearShort: wearObj.short,
      price: wearObj.price
    };

    setRollSkins(band);
    setWinningIndex(winIdx);
    setOpenResult({
      ...wonSkin,
      wear: wearObj.state,
      wearShort: wearObj.short,
      price: wearObj.price
    });

    setTimeout(() => {
      addToInventory({
        ...wonSkin,
        wear: wearObj.state,
        wearShort: wearObj.short,
        price: wearObj.price
      });
      setInventory(getInventory());
      setIsOpening(false);
    }, 5300);
  };

  const handleDeposit = (amount) => {
    addBalance(amount);
    setBalanceState(getBalance());
  };

  const handleSellOne = (uid, price) => {
    removeSkinFromInventory(uid);
    setInventory(getInventory());
    setBalanceState(bal => bal + price);
  };

  const handleSellAll = () => {
    const items = getInventory();
    const total = items.reduce((s, item) => s + item.price, 0);
    clearInventory();
    setInventory([]);
    setBalanceState(bal => bal + total);
  };

  return (
    <div>
      <BalanceBar
        balance={balance}
        onAddClick={() => setShowDeposit(true)}
      />
      {!selectedCase ? (
        <>
          <h1 style={{ textAlign: "center", margin: "36px 0 0 0", fontWeight: 700 }}>
            Otwieranie skrzynek CS2
          </h1>
          <CaseList
            cases={CASES}
            onCaseClick={handleCaseClick}
          />
        </>
      ) : (
        <CaseView
          kase={selectedCase}
          onBack={() => setSelectedCase(null)}
          onOpen={handleOpenCase}
          openResult={openResult}
          isOpening={isOpening}
          rollSkins={rollSkins}
          winningIndex={winningIndex}
          mode={mode}
          setMode={setMode}
          casePrice={casePrice}
          caseSkins={caseSkins}
          normalPrice={selectedCase?.normal_price ?? selectedCase?.price ?? 0}
          jesterPrice={selectedCase?.jester_price ?? 0}
        />
      )}
      {showDeposit && (
        <DepositModal
          onClose={() => setShowDeposit(false)}
          onDeposit={handleDeposit}
        />
      )}

      <InventoryDock
        count={inventory.length}
        isOpen={inventoryOpen}
        onToggle={() => setInventoryOpen((v) => !v)}
      />
      <InventoryPanel
        items={inventory}
        isOpen={inventoryOpen}
        onSellOne={handleSellOne}
        onSellAll={handleSellAll}
        onClose={() => setInventoryOpen(false)}
      />
    </div>
  );
}
