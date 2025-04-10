
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  exchange: 'NSE' | 'BSE';
  volume: number;
  marketCap?: number;
  dayHigh?: number;
  dayLow?: number;
  open?: number;
  previousClose?: number;
}

export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface ChartData {
  date: string;
  value: number;
}

export interface WatchlistItem extends StockData {
  id: string;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  change?: number;
  changePercent?: number;
  totalValue?: number;
  profit?: number;
  profitPercent?: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number | string;
  signal?: 'buy' | 'sell' | 'neutral';
}

export interface AIAnalysis {
  prediction: string;
  confidence: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  signals: Array<{
    name: string;
    type: 'positive' | 'negative' | 'neutral';
    description: string;
  }>;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}
