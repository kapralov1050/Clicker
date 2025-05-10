export interface Upgrade {
  title: string, 
  price: number, 
  effect: number
}

export interface LevelProp {
  requiredCurrency: number;
  profitReceived: Profit
}

export interface Profit {
  bonus: number;
  color: string;
  skin?: string;
}

export interface Bonus {
  name: string;
  duration: number;
  cooldown: number;
  action: () => void;
  end: () => void;
}

export interface MainButtonStyle {
  transform: string;
  transition: string;
  color: string;
}

export interface Achievement {
  achievement: string;
  required: () => boolean
}