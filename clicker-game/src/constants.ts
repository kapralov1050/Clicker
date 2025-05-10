import type { LevelProp } from "./types/common";

export const Levels: LevelProp[] = [
  { requiredCurrency: 0, profitReceived: { bonus: 0, color: 'none'} },
  { requiredCurrency: 100, profitReceived: { bonus: 1, color: 'blue' } },
  { requiredCurrency: 300, profitReceived: { bonus: 1.5, color: 'red', skin: "/icons/3.png" } },
  { requiredCurrency: 600, profitReceived: { bonus: 1.5, color: 'green', } },
  { requiredCurrency: 1000, profitReceived: { bonus: 1.5, color: 'purple' } },
  { requiredCurrency: 1500, profitReceived: { bonus: 2, color: 'orange', skin: "/icons/5.png" } },
  { requiredCurrency: 2300, profitReceived: { bonus: 2, color: 'gold' } },
  { requiredCurrency: 6000, profitReceived: { bonus: 3, color: 'teal' } },
  { requiredCurrency: 9000, profitReceived: { bonus: 3, color: 'violet', skin: "/icons/8.png" } },
  { requiredCurrency: 13000, profitReceived: { bonus: 3, color: 'maroon' } },
  { requiredCurrency: 17000, profitReceived: { bonus: 4, color: 'navy' } },
  { requiredCurrency: 21000, profitReceived: { bonus: 4, color: 'lime', skin: "/icons/11.png" } },
  { requiredCurrency: 25000, profitReceived: { bonus: 4, color: 'crimson' } },
  { requiredCurrency: 30500, profitReceived: { bonus: 5., color: 'indigo' } },
  { requiredCurrency: 49350, profitReceived: { bonus: 5, color: 'coral', skin: "/icons/15.png" } },
  { requiredCurrency: 79850, profitReceived: { bonus: 7, color: 'skyblue' } },
  { requiredCurrency: 129200, profitReceived: { bonus: 9, color: 'olive', skin: "/icons/17.png" } },
  { requiredCurrency: 209050, profitReceived: { bonus: 11, color: 'salmon' } },
  { requiredCurrency: 338250, profitReceived: { bonus: 12, color: 'plum' } },
  { requiredCurrency: 547300, profitReceived: { bonus: 25, color: 'steelblue', skin: "/icons/20.png" } },
]

export const upgrades = [
    {title: 'HTML: x-1.5', price: 150, effect: 1.5 },
    {title: 'CSS: x-2', price: 600, effect: 2 },
    {title: 'Javascript: x-2.5', price: 2000, effect: 2.5 },
    {title: 'Typescript: x-3', price: 5000, effect: 3 },
    {title: 'Vue: x-3', price: 10000, effect: 3 },
    {title: 'Git: x-3', price: 14000, effect: 3 },
    {title: 'Vitest: x-3', price: 20000, effect: 3 },
    {title: 'Nuxt: x-3', price: 40000, effect: 3 },
]
