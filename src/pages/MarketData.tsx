
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  mockStocks, 
  mockIndices,
  mockNiftyChartData
} from '@/data/mockData';
import StockList from '@/components/dashboard/StockList';
import MarketIndices from '@/components/dashboard/MarketIndices';
import MarketChart from '@/components/dashboard/MarketChart';

const MarketData = () => {
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">Market Data</h1>
        <p className="text-gray-600">
          Comprehensive real-time data for NSE and BSE markets
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-12">
          <MarketIndices indices={mockIndices} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-8">
          <MarketChart 
            data={mockNiftyChartData} 
            title="NIFTY 50 Performance" 
          />
        </div>
        <div className="md:col-span-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-heading">Market Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium text-nifty">Market Breadth</h3>
                  <p className="text-gray-600 mt-1">Advances: 1,245 | Declines: 687 | Unchanged: 83</p>
                </div>
                <div>
                  <h3 className="font-medium text-nifty">Turnover (₹ Cr)</h3>
                  <p className="text-gray-600 mt-1">NSE: 78,425 | BSE: 12,578</p>
                </div>
                <div>
                  <h3 className="font-medium text-nifty">India VIX</h3>
                  <p className="text-gray-600 mt-1">14.25 (-3.8%)</p>
                </div>
                <div>
                  <h3 className="font-medium text-nifty">FII/DII Activity (₹ Cr)</h3>
                  <p className="text-gray-600 mt-1">FII: -1,245 | DII: +1,876</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <StockList stocks={mockStocks} title="NSE Top Stocks" />
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Data is delayed by 15 minutes unless specified. Not for trading purposes.</p>
      </div>
    </Layout>
  );
};

export default MarketData;
