export interface Product {
  id: string;
  diamonds?: number;
  uc?: number;
  tokens?: number;
  amount?: number;
  bonus?: number;
  price: number;
}

export interface GameConfig {
  id: string;
  name: string;
  slug: string;
  currencyName: string;
  currencyImage?: string;
  image: string;
  fields: {
    name: string;
    label: string;
    placeholder: string;
    required: boolean;
  }[];
  products: Product[];
}

export const GAMES_CONFIG: Record<string, GameConfig> = {
  mlbb: {
    id: 'mlbb',
    name: 'Mobile Legends',
    slug: 'mlbb',
    currencyName: 'Diamonds',
    currencyImage: '/items/mlbb.png',
    image: '/game/mlbb.png',
    fields: [
      { name: 'userId', label: 'User ID', placeholder: 'Enter User ID', required: true },
      { name: 'zoneId', label: 'Zone ID', placeholder: 'Enter Zone ID', required: true },
    ],
    products: [
      { id: 'ml1', amount: 86, bonus: 9, price: 1.50 },
      { id: 'ml2', amount: 172, bonus: 18, price: 3.00 },
      { id: 'ml3', amount: 257, bonus: 28, price: 4.56 },
      { id: 'ml4', amount: 344, bonus: 37, price: 6.00 },
      { id: 'ml5', amount: 706, bonus: 84, price: 12.00 },
      { id: 'ml6', amount: 1050, bonus: 134, price: 18.00 },
      { id: 'ml7', amount: 2195, bonus: 288, price: 36.00 },
      { id: 'ml8', amount: 3688, bonus: 544, price: 60.00 },
    ]
  },
  pubg: {
    id: 'pubg',
    name: 'PUBG Mobile',
    slug: 'pubg',
    currencyName: 'UC',
    currencyImage: '/items/uc.png',
    image: '/game/pubg.png',
    fields: [
      { name: 'userId', label: 'Player ID', placeholder: 'Enter Player ID', required: true },
    ],
    products: [
      { id: 'pg1', amount: 60, price: 0.99 },
      { id: 'pg2', amount: 300, bonus: 25, price: 4.99 },
      { id: 'pg3', amount: 600, bonus: 60, price: 9.99 },
      { id: 'pg4', amount: 1500, bonus: 300, price: 24.99 },
      { id: 'pg5', amount: 3000, bonus: 850, price: 49.99 },
      { id: 'pg6', amount: 6000, bonus: 2100, price: 99.99 },
    ]
  },
  freefire: {
    id: 'freefire',
    name: 'Free Fire',
    slug: 'freefire',
    currencyName: 'Diamonds',
    image: '/game/freefire.png',
    fields: [
      { name: 'userId', label: 'Player ID', placeholder: 'Enter Player ID', required: true },
    ],
    products: [
      { id: 'ff1', amount: 100, price: 1.00 },
      { id: 'ff2', amount: 310, price: 3.10 },
      { id: 'ff3', amount: 520, price: 5.20 },
      { id: 'ff4', amount: 1060, price: 10.60 },
      { id: 'ff5', amount: 2180, price: 21.80 },
      { id: 'ff6', amount: 5600, price: 56.00 },
    ]
  },
  hok: {
    id: 'hok',
    name: 'Honor of Kings',
    slug: 'hok',
    currencyName: 'Tokens',
    image: '/game/hok.png',
    fields: [
      { name: 'userId', label: 'Player ID', placeholder: 'Enter Player ID', required: true },
    ],
    products: [
      { id: 'hk1', amount: 80, price: 1.00 },
      { id: 'hk2', amount: 240, price: 3.00 },
      { id: 'hk3', amount: 400, price: 5.00 },
      { id: 'hk4', amount: 800, price: 10.00 },
      { id: 'hk5', amount: 2400, price: 30.00 },
      { id: 'hk6', amount: 4000, price: 50.00 },
    ]
  }
};
