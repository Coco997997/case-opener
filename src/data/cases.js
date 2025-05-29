import { SKINS } from "./skins";

export const CASES = [
  {
    id: "supportscase",
    name: "Support's Case",
    image: "http://media.csgo-skins.com/container/event-champions-league-1.png",
    normal_price: 4.20,
    jester_price: 154.35,
    skins: [
      { id: 1, chance: 0.002 },
      { id: 2, chance: 0.003 },
      { id: 3, chance: 0.007 },
      { id: 4, chance: 0.066 },
      { id: 5, chance: 0.07 },
      { id: 6, chance: 0.205 },
      { id: 7, chance: 3.412 },
      { id: 8, chance: 0.402 },
      { id: 9, chance: 2.525 },
      { id: 10, chance: 7.484 },
      { id: 11, chance: 7.431 },
      { id: 12, chance: 5.289 },
      { id: 13, chance: 8.376 },
      { id: 14, chance: 9.233 },
      { id: 15, chance: 6.93 },
      { id: 16, chance: 1.924 },
      { id: 17, chance: 9.138 },
      { id: 18, chance: 9.455 },
      { id: 19, chance: 7.247 },
      { id: 20, chance: 5.673 },
      { id: 21, chance: 9.455 },
      { id: 22, chance: 5.673 },
    ]
  },
  {
    id: "lurkerscase",
    name: "Lurker's Case",
    image: "http://media.csgo-skins.com/container/event-champions-league-2.png",
    normal_price: 10.50,
    jester_price: 283.50,
    skins: [
      { id: 23, chance: 0.014 },
      { id: 24, chance: 0.02 },
      { id: 25, chance: 0.016 },
      { id: 26, chance: 0.012 },
      { id: 27, chance: 0.028 },
      { id: 28, chance: 0.028 },
      { id: 29, chance: 0.052 },
      { id: 30, chance: 0.039 },
      { id: 31, chance: 0.456 },
      { id: 32, chance: 1.522 },
      { id: 33, chance: 6.479 },
      { id: 34, chance: 4.246 },
      { id: 35, chance: 4.387 },
      { id: 36, chance: 8.629 },
      { id: 37, chance: 4.228 },
      { id: 38, chance: 9.846 },
      { id: 39, chance: 9.846 },
      { id: 40, chance: 9.846 },
      { id: 41, chance: 8.491 },
      { id: 42, chance: 8.484 },
      { id: 43, chance: 8.484 },
      { id: 44, chance: 2.121 },
      { id: 45, chance: 6.363 },
      { id: 46, chance: 6.363 }
    ]
  }
];

export const getSkinById = (id) => SKINS.find(skin => skin.id === id);
