
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import MarketIndices from '@/components/dashboard/MarketIndices';
import StockList from '@/components/dashboard/StockList';
import MarketChart from '@/components/dashboard/MarketChart';
import Watchlist from '@/components/dashboard/Watchlist';
import TechnicalIndicators from '@/components/dashboard/TechnicalIndicators';
import AIInsights from '@/components/dashboard/AIInsights';
import Portfolio from '@/components/dashboard/Portfolio';
import AIChatAssistant from '@/components/dashboard/AIChatAssistant';
import { 
  mockIndices, 
  mockStocks, 
  mockNiftyChartData, 
  mockWatchlist, 
  mockTechnicalIndicators, 
  mockAIAnalysis,
  mockPortfolio,
  getUpdatedStockData
} from '@/data/mockData';
import { StockData } from '@/types/stock';

const Index = () => {
  const [indices, setIndices] = useState(mockIndices);
  const [stocks, setStocks] = useState<StockData[]>(mockStocks);
  const [chartData] = useState(mockNiftyChartData);
  const [watchlist, setWatchlist] = useState(mockWatchlist);
  const [indicators] = useState(mockTechnicalIndicators);
  const [aiAnalysis] = useState(mockAIAnalysis);
  const [portfolio, setPortfolio] = useState(mockPortfolio);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStocks = getUpdatedStockData(stocks);
      setStocks(updatedStocks);
      
      // Update watchlist stocks with the new prices
      const updatedWatchlist = watchlist.map(item => {
        const updatedStock = updatedStocks.find(s => s.symbol === item.symbol);
        return updatedStock ? { ...item, ...updatedStock } : item;
      });
      
      setWatchlist(updatedWatchlist);
      
      // Update portfolio with the new prices
      const updatedPortfolio = portfolio.map(item => {
        const updatedStock = updatedStocks.find(s => s.symbol === item.symbol);
        if (!updatedStock) return item;
        
        const currentPrice = updatedStock.price;
        const totalValue = currentPrice * item.quantity;
        const profit = totalValue - (item.buyPrice * item.quantity);
        const profitPercent = (profit / (item.buyPrice * item.quantity)) * 100;
        
        return {
          ...item,
          currentPrice,
          totalValue,
          profit,
          profitPercent
        };
      });
      
      setPortfolio(updatedPortfolio);
      
      // Update indices with small random changes
      const updatedIndices = indices.map(index => {
        const changePercent = (Math.random() * 0.1) * (Math.random() > 0.5 ? 1 : -1);
        const newValue = index.value * (1 + changePercent / 100);
        const change = newValue - (index.value - index.change);
        
        return {
          ...index,
          value: parseFloat(newValue.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat((changePercent + index.changePercent).toFixed(2))
        };
      });
      
      setIndices(updatedIndices);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [stocks, watchlist, portfolio, indices]);

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">Market Dashboard</h1>
        <p className="text-gray-600">
          Real-time insights for Indian stock markets with AI-powered analysis
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-12">
          <MarketIndices indices={indices} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-8">
          <MarketChart 
            data={chartData} 
            title="NIFTY 50 Performance" 
          />
        </div>
        <div className="md:col-span-4">
          <Watchlist items={watchlist} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-6">
          <StockList stocks={stocks.slice(0, 5)} title="Top Market Movers" />
        </div>
        <div className="md:col-span-6">
          <Portfolio items={portfolio} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <TechnicalIndicators indicators={indicators} />
        </div>
        <div className="md:col-span-4">
          <AIInsights analysis={aiAnalysis} />
        </div>
        <div className="md:col-span-4">
          <AIChatAssistant />
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Disclaimer: All data is simulated for demonstration purposes.</p>
        <p>This platform does not provide direct buy/sell recommendations. SEBI compliant.</p>
      </div>
    </Layout>
  );
};

export default Index;
