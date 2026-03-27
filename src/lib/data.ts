export interface Commodity {
  id: string;
  name: string;
  pricePerGram: number;   // raw per-gram price (live or fallback)
  unit: string;           // display unit label e.g. "/gram"
  isPerKg?: boolean;      // true for silver (priced per kg not per gram)
  change: number;
  trend: 'up' | 'down';
  history: number[];      // history values are per-gram (or per-kg if isPerKg)
}

export const commodities: Commodity[] = [
  {
    id: 'gold-24k',
    name: 'Gold 24K',
    pricePerGram: 14694,
    unit: '/gram',
    change: 0.15,
    trend: 'up',
    history: [14672, 14675, 14680, 14685, 14688, 14690, 14692, 14694]
  },
  {
    id: 'gold-22k',
    name: 'Gold 22K',
    pricePerGram: 13471,
    unit: '/gram',
    change: 0.15,
    trend: 'up',
    history: [13451, 13454, 13458, 13462, 13465, 13468, 13470, 13471]
  },
  {
    id: 'gold-18k',
    name: 'Gold 18K',
    pricePerGram: 11021,
    unit: '/gram',
    change: 0.15,
    trend: 'up',
    history: [11009, 11012, 11015, 11018, 11020, 11021, 11021, 11021]
  },
  {
    id: 'silver-999',
    name: 'Silver 999 (18% GST)',
    pricePerGram: 295000,  // stored as per-kg for silver with GST
    isPerKg: true,
    unit: '/kg',
    change: 0.0,
    trend: 'up',
    history: [295000, 295000, 295000, 295000, 295000, 295000, 295000, 295000]
  },
  {
    id: 'silver-925',
    name: 'Silver 925 (18% GST)',
    pricePerGram: 272575,  // stored as per-kg for silver with GST (92.5% pure + 18% GST)
    isPerKg: true,
    unit: '/kg',
    change: 0.0,
    trend: 'up',
    history: [272575, 272575, 272575, 272575, 272575, 272575, 272575, 272575]
  },
  {
    id: 'platinum',
    name: 'Platinum (18% GST)',
    pricePerGram: 3500,
    unit: '/gram',
    change: 0.0,
    trend: 'up',
    history: [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500]
  },
  {
    id: 'palladium',
    name: 'Palladium (18% GST)',
    pricePerGram: 2800,
    unit: '/gram',
    change: 0.0,
    trend: 'up',
    history: [2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800]
  },
  {
    id: 'petrol',
    name: 'Petrol (Mumbai)',
    pricePerGram: 103.54,
    unit: '/liter',
    change: 0.04,
    trend: 'up',
    history: [103.50, 103.50, 103.51, 103.51, 103.52, 103.53, 103.53, 103.54]
  },
  {
    id: 'diesel',
    name: 'Diesel (Mumbai)',
    pricePerGram: 90.03,
    unit: '/liter',
    change: 0.0,
    trend: 'up',
    history: [90.03, 90.03, 90.03, 90.03, 90.03, 90.03, 90.03, 90.03]
  },
  {
    id: 'cng',
    name: 'CNG (Mumbai)',
    pricePerGram: 80.50,
    unit: '/kg',
    change: 0.0,
    trend: 'up',
    history: [80.50, 80.50, 80.50, 80.50, 80.50, 80.50, 80.50, 80.50]
  }
];
