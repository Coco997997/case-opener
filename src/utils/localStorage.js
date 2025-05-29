const BALANCE_KEY = "cs2-balance";
const HISTORY_KEY = "cs2-history";
const INVENTORY_KEY = "cs2-inventory";

export const getBalance = () => Number(localStorage.getItem(BALANCE_KEY)) || 200;
export const setBalance = (value) => localStorage.setItem(BALANCE_KEY, value);
export const addBalance = (amount) => setBalance(getBalance() + amount);
export const subtractBalance = (amount) => setBalance(getBalance() - amount);

export const getHistory = () => {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
};
export const addToHistory = (entry) => {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

// Ekwipunek
export const getInventory = () => {
  const raw = localStorage.getItem(INVENTORY_KEY);
  return raw ? JSON.parse(raw) : [];
};
export const addToInventory = (skin) => {
  const current = getInventory();
  current.push({ ...skin, uid: crypto.randomUUID?.() || String(Date.now()) + Math.random() });
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(current));
};
export const removeSkinFromInventory = (uid) => {
  const current = getInventory();
  const filtered = current.filter((item) => item.uid !== uid);
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(filtered));
};
export const clearInventory = () => localStorage.setItem(INVENTORY_KEY, JSON.stringify([]));
