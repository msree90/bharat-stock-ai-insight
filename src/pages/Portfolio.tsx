
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPortfolio } from '@/data/mockData';
import { PortfolioItem } from '@/types/stock';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  PieChart, 
  BarChart3, 
  LineChart 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Portfolio = () => {
  const [portfolio] = useState<PortfolioItem[]>(mockPortfolio);
  
  const totalValue = portfolio.reduce((sum, item) => sum + (item.totalValue || 0), 0);
  const totalInvested = portfolio.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercent = (totalProfit / totalInvested) * 100;
  
  const todayProfit = portfolio.reduce((sum, item) => {
    const todayChange = item.change || 0;
    return sum + (todayChange * item.quantity);
  }, 0);

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">My Portfolio</h1>
        <p className="text-gray-600">
          Track your investments and analyze performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold mt-1">₹{totalValue.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-10 h-10 bg-nifty/10 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-nifty" />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Total Invested: ₹{totalInvested.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Overall Returns</p>
                <p className={`text-2xl font-bold mt-1 flex items-center ${totalProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {totalProfit >= 0 ? (
                    <ArrowUpRight className="h-5 w-5 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 mr-1" />
                  )}
                  ₹{Math.abs(totalProfit).toLocaleString('en-IN')}
                </p>
              </div>
              <div className={`w-10 h-10 ${totalProfit >= 0 ? 'bg-profit/10' : 'bg-loss/10'} rounded-full flex items-center justify-center`}>
                {totalProfit >= 0 ? (
                  <TrendingUp className={`h-5 w-5 ${totalProfit >= 0 ? 'text-profit' : 'text-loss'}`} />
                ) : (
                  <TrendingDown className={`h-5 w-5 ${totalProfit >= 0 ? 'text-profit' : 'text-loss'}`} />
                )}
              </div>
            </div>
            <div className={`text-xs ${totalProfitPercent >= 0 ? 'text-profit' : 'text-loss'} mt-2`}>
              {totalProfitPercent >= 0 ? '+' : ''}{totalProfitPercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's P&L</p>
                <p className={`text-2xl font-bold mt-1 flex items-center ${todayProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {todayProfit >= 0 ? (
                    <ArrowUpRight className="h-5 w-5 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 mr-1" />
                  )}
                  ₹{Math.abs(todayProfit).toLocaleString('en-IN')}
                </p>
              </div>
              <div className={`w-10 h-10 ${todayProfit >= 0 ? 'bg-profit/10' : 'bg-loss/10'} rounded-full flex items-center justify-center`}>
                <BarChart3 className={`h-5 w-5 ${todayProfit >= 0 ? 'text-profit' : 'text-loss'}`} />
              </div>
            </div>
            <div className={`text-xs ${todayProfit >= 0 ? 'text-profit' : 'text-loss'} mt-2`}>
              {todayProfit >= 0 ? '+' : ''}{((todayProfit / totalValue) * 100).toFixed(2)}% today
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-heading">Portfolio Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="holdings">
            <TabsList className="mb-4">
              <TabsTrigger value="holdings" className="flex items-center gap-1">
                <Wallet className="h-4 w-4" />
                Holdings
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="allocation" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                Allocation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="holdings">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stock</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Avg. Cost</TableHead>
                    <TableHead>LTP</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>P&L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolio.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div>{item.symbol}</div>
                        <div className="text-xs text-gray-500">{item.name}</div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₹{item.buyPrice.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <div>₹{item.currentPrice.toLocaleString('en-IN')}</div>
                        <div 
                          className={`text-xs flex items-center ${
                            (item.change || 0) >= 0 ? 'text-profit' : 'text-loss'
                          }`}
                        >
                          {(item.change || 0) >= 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-0.5" />
                          )}
                          {Math.abs((item.changePercent || 0)).toFixed(2)}%
                        </div>
                      </TableCell>
                      <TableCell>₹{item.totalValue?.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <div className={`${(item.profit || 0) >= 0 ? 'text-profit' : 'text-loss'}`}>
                          {(item.profit || 0) >= 0 ? '+' : ''}₹{Math.abs((item.profit || 0)).toLocaleString('en-IN')}
                        </div>
                        <div 
                          className={`text-xs ${
                            (item.profitPercent || 0) >= 0 ? 'text-profit' : 'text-loss'
                          }`}
                        >
                          {(item.profitPercent || 0) >= 0 ? '+' : ''}
                          {Math.abs((item.profitPercent || 0)).toFixed(2)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <LineChart className="h-12 w-12 mx-auto mb-3 text-nifty" />
                  <p>Portfolio performance chart would be displayed here</p>
                  <p className="text-xs mt-1">Showing historical returns and benchmark comparison</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="allocation">
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <PieChart className="h-12 w-12 mx-auto mb-3 text-nifty" />
                  <p>Portfolio allocation chart would be displayed here</p>
                  <p className="text-xs mt-1">Showing sector-wise and stock-wise allocation</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Portfolio Beta</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-nifty h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">0.95</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Slightly less volatile than the market</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Sector Concentration</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">Moderate</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">50% in Banking & IT sectors</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Volatility (Standard Deviation)</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">Low</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Good diversification across large-cap stocks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-heading">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">CAGR</div>
                <div className="text-lg font-semibold text-profit">+12.5%</div>
                <div className="text-xs text-gray-500">vs. Nifty50 +10.2%</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Sharpe Ratio</div>
                <div className="text-lg font-semibold">1.45</div>
                <div className="text-xs text-gray-500">Good risk-adjusted returns</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Drawdown</div>
                <div className="text-lg font-semibold text-loss">-8.2%</div>
                <div className="text-xs text-gray-500">Max. decline from peak</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Alpha</div>
                <div className="text-lg font-semibold text-profit">+2.3%</div>
                <div className="text-xs text-gray-500">Outperformance vs. benchmark</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Portfolio analytics are calculated based on historical performance and are not indicative of future returns.</p>
      </div>
    </Layout>
  );
};

export default Portfolio;
