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
  color:
    | 'none'
    | 'blue'
    | 'red'
    | 'green'
    | 'purple'
    | 'orange'
    | 'gold'
    | 'teal'
    | 'violet'
    | 'maroon'
    | 'navy'
    | 'lime'
    | 'crimson'
    | 'indigo'
    | 'coral'
    | 'skyblue'
    | 'olive'
    | 'salmon'
    | 'plum'
    | 'steelblue';
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