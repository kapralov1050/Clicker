import type { LevelProp } from "./types/common";

export const Levels: LevelProp[] = [
  { requiredCurrency: 0, profitReceived: { bonus: 0, color: 'none' } },
  { requiredCurrency: 100, profitReceived: { bonus: 1, color: '#6b8cff' } }, // Мягкий голубой
  { requiredCurrency: 300, profitReceived: { bonus: 1.5, color: '#ff7b7b', skin: "/icons/3.png" } }, // Светло-коралловый
  { requiredCurrency: 600, profitReceived: { bonus: 1.5, color: '#7bcfa7' } }, // Мятный
  { requiredCurrency: 1000, profitReceived: { bonus: 1.5, color: '#b28fce' } }, // Лавандовый
  { requiredCurrency: 1500, profitReceived: { bonus: 2, color: '#ffb865', skin: "/icons/5.png" } }, // Персиковый
  { requiredCurrency: 2300, profitReceived: { bonus: 2, color: '#e6c229' } }, // Тёплый песочный
  { requiredCurrency: 6000, profitReceived: { bonus: 3, color: '#5cc2c2' } }, // Морская волна
  { requiredCurrency: 9000, profitReceived: { bonus: 3, color: '#a68ace', skin: "/icons/8.png" } }, // Фиалковый
  { requiredCurrency: 13000, profitReceived: { bonus: 3, color: '#c97575' } }, // Пыльно-розовый
  { requiredCurrency: 17000, profitReceived: { bonus: 4, color: '#5a7cff' } }, // Джинсовый синий
  { requiredCurrency: 21000, profitReceived: { bonus: 4, color: '#a0d668', skin: "/icons/11.png" } }, // Светло-зелёный
  { requiredCurrency: 25000, profitReceived: { bonus: 4, color: '#e67e7e' } }, // Томатный
  { requiredCurrency: 30500, profitReceived: { bonus: 5, color: '#7e6bc4' } }, // Умеренный фиолетовый
  { requiredCurrency: 49350, profitReceived: { bonus: 5, color: '#ff9e7d', skin: "/icons/15.png" } }, // Лососёвый
  { requiredCurrency: 79850, profitReceived: { bonus: 7, color: '#74d1ea' } }, // Небесно-голубой
  { requiredCurrency: 129200, profitReceived: { bonus: 9, color: '#b5b35c', skin: "/icons/17.png" } }, // Оливковый светлый
  { requiredCurrency: 209050, profitReceived: { bonus: 11, color: '#e9967a' } }, // Тёмный лосось
  { requiredCurrency: 338250, profitReceived: { bonus: 12, color: '#c9a0dc' } }, // Светлая сирень
  { requiredCurrency: 547300, profitReceived: { bonus: 25, color: '#6f8faf', skin: "/icons/20.png" } }, // Стальной с голубым оттенком
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
