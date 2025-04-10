
import { StockData, IndexData, ChartData, TechnicalIndicator, AIAnalysis, PortfolioItem, WatchlistItem } from '@/types/stock';

// Mock Indian stock market indices data
export const mockIndices: IndexData[] = [
  { name: 'NIFTY 50', value: 22460.25, change: 129.57, changePercent: 0.58 },
  { name: 'SENSEX', value: 73793.28, change: 425.32, changePercent: 0.58 },
  { name: 'NIFTY BANK', value: 48237.50, change: 312.45, changePercent: 0.65 },
  { name: 'NIFTY IT', value: 34125.70, change: -152.30, changePercent: -0.45 }
];

// Mock stocks data - Indian stocks
export const mockStocks: StockData[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2478.25, change: 35.60, changePercent: 1.46, exchange: 'NSE', volume: 5632987, marketCap: 1678900000000, dayHigh: 2485.75, dayLow: 2450.10, open: 2452.80, previousClose: 2442.65 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3852.40, change: -28.75, changePercent: -0.74, exchange: 'NSE', volume: 1245632, marketCap: 1412300000000, dayHigh: 3880.25, dayLow: 3845.10, open: 3875.50, previousClose: 3881.15 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1625.30, change: 12.45, changePercent: 0.77, exchange: 'NSE', volume: 3256987, marketCap: 1230500000000, dayHigh: 1632.80, dayLow: 1618.90, open: 1620.10, previousClose: 1612.85 },
  { symbol: 'INFY', name: 'Infosys', price: 1467.85, change: -18.20, changePercent: -1.22, exchange: 'NSE', volume: 2154789, marketCap: 608700000000, dayHigh: 1475.60, dayLow: 1462.35, open: 1474.50, previousClose: 1486.05 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1052.95, change: 8.30, changePercent: 0.79, exchange: 'NSE', volume: 2987632, marketCap: 736500000000, dayHigh: 1058.70, dayLow: 1045.60, open: 1049.20, previousClose: 1044.65 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1768.50, change: -5.75, changePercent: -0.32, exchange: 'NSE', volume: 1458963, marketCap: 352400000000, dayHigh: 1778.90, dayLow: 1765.25, open: 1772.40, previousClose: 1774.25 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2341.60, change: 14.75, changePercent: 0.63, exchange: 'NSE', volume: 987456, marketCap: 552300000000, dayHigh: 2349.80, dayLow: 2328.20, open: 2330.50, previousClose: 2326.85 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 6978.25, change: 85.60, changePercent: 1.24, exchange: 'NSE', volume: 876543, marketCap: 423600000000, dayHigh: 6995.40, dayLow: 6920.10, open: 6930.80, previousClose: 6892.65 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1245.80, change: 22.35, changePercent: 1.83, exchange: 'NSE', volume: 1657984, marketCap: 698400000000, dayHigh: 1250.40, dayLow: 1230.70, open: 1232.90, previousClose: 1223.45 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2568.35, change: -42.60, changePercent: -1.63, exchange: 'NSE', volume: 2345678, marketCap: 291800000000, dayHigh: 2595.75, dayLow: 2558.90, open: 2590.40, previousClose: 2610.95 }
];

// Mock chart data - Historical price for NIFTY 50
export const mockNiftyChartData: ChartData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  // Start with a base value and add some random fluctuation
  const baseValue = 22000 + Math.sin(i / 3) * 400;
  const randomFactor = Math.random() * 100 - 50;
  
  return {
    date: date.toISOString().split('T')[0],
    value: Number((baseValue + randomFactor).toFixed(2))
  };
});

// Mock watchlist
export const mockWatchlist: WatchlistItem[] = [
  { ...mockStocks[0], id: '1' },
  { ...mockStocks[2], id: '2' },
  { ...mockStocks[4], id: '3' },
  { ...mockStocks[7], id: '4' },
];

// Mock portfolio
export const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 10,
    buyPrice: 2400.50,
    currentPrice: 2478.25,
    totalValue: 24782.50,
    profit: 777.50,
    profitPercent: 3.24
  },
  {
    id: '2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 5,
    buyPrice: 3900.25,
    currentPrice: 3852.40,
    totalValue: 19262.00,
    profit: -239.25,
    profitPercent: -1.23
  },
  {
    id: '3',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    quantity: 15,
    buyPrice: 1580.75,
    currentPrice: 1625.30,
    totalValue: 24379.50,
    profit: 668.25,
    profitPercent: 2.82
  },
  {
    id: '4',
    symbol: 'INFY',
    name: 'Infosys',
    quantity: 8,
    buyPrice: 1490.60,
    currentPrice: 1467.85,
    totalValue: 11742.80,
    profit: -182.00,
    profitPercent: -1.53
  }
];

// Mock technical indicators
export const mockTechnicalIndicators: TechnicalIndicator[] = [
  { name: 'RSI', value: 58.35, signal: 'neutral' },
  { name: 'MACD', value: 15.23, signal: 'buy' },
  { name: 'Bollinger Bands', value: 'Upper', signal: 'sell' },
  { name: 'Moving Average (50)', value: 22150.45, signal: 'buy' },
  { name: 'Moving Average (200)', value: 21589.75, signal: 'buy' },
  { name: 'Stochastic Oscillator', value: 75.68, signal: 'neutral' }
];

// Mock AI analysis
export const mockAIAnalysis: AIAnalysis = {
  prediction: "Nifty may see moderate upside in the short term",
  confidence: 68,
  trend: 'bullish',
  signals: [
    {
      name: 'Technical Trend',
      type: 'positive',
      description: 'Multiple technical indicators showing bullish momentum'
    },
    {
      name: 'Market Sentiment',
      type: 'positive',
      description: 'Positive sentiment in financial news over the past 24 hours'
    },
    {
      name: 'Option Chain Analysis',
      type: 'neutral',
      description: 'Put-Call Ratio (PCR) remains balanced at 1.02'
    },
    {
      name: 'Foreign Investment',
      type: 'negative',
      description: 'FII outflow observed in the last 3 trading sessions'
    },
    {
      name: 'Volatility Index',
      type: 'positive',
      description: 'India VIX has declined by 3.8% suggesting reduced market fear'
    }
  ]
};

// Function to simulate real-time updates
export function getUpdatedStockPrice(currentPrice: number): number {
  const changePercent = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and +0.5%
  const newPrice = currentPrice * (1 + changePercent / 100);
  return parseFloat(newPrice.toFixed(2));
}

export function getUpdatedStockData(stocks: StockData[]): StockData[] {
  return stocks.map(stock => {
    const newPrice = getUpdatedStockPrice(stock.price);
    const change = parseFloat((newPrice - stock.previousClose!).toFixed(2));
    const changePercent = parseFloat((change / stock.previousClose! * 100).toFixed(2));
    
    return {
      ...stock,
      price: newPrice,
      change,
      changePercent
    };
  });
}
