
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  mockStocks, 
  mockTechnicalIndicators,
  mockAIAnalysis
} from '@/data/mockData';
import TechnicalIndicators from '@/components/dashboard/TechnicalIndicators';
import AIInsights from '@/components/dashboard/AIInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  BarChart3, 
  CandlestickChart, 
  Gauge, 
  Brain
} from 'lucide-react';

const Analysis = () => {
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">Technical Analysis</h1>
        <p className="text-gray-600">
          Advanced technical indicators and AI-powered market analysis
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-heading">NIFTY 50 Technical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="charts">
                <TabsList className="mb-4">
                  <TabsTrigger value="charts" className="flex items-center gap-1">
                    <LineChart className="h-4 w-4" />
                    Charts
                  </TabsTrigger>
                  <TabsTrigger value="candlestick" className="flex items-center gap-1">
                    <CandlestickChart className="h-4 w-4" />
                    Candlestick
                  </TabsTrigger>
                  <TabsTrigger value="indicators" className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    Indicators
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    AI Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="charts" className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <LineChart className="h-10 w-10 mx-auto mb-2 text-nifty" />
                    <p>Advanced chart visualization would be displayed here</p>
                    <p className="text-xs mt-1">Including Support/Resistance levels and trend lines</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="candlestick" className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <CandlestickChart className="h-10 w-10 mx-auto mb-2 text-nifty" />
                    <p>Candlestick pattern analysis would be displayed here</p>
                    <p className="text-xs mt-1">Including pattern recognition and volume analysis</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="indicators" className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <Gauge className="h-10 w-10 mx-auto mb-2 text-nifty" />
                    <p>Technical indicators would be displayed here</p>
                    <p className="text-xs mt-1">Including RSI, MACD, Bollinger Bands, and more</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai" className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <Brain className="h-10 w-10 mx-auto mb-2 text-nifty" />
                    <p>AI pattern recognition and predictions would be displayed here</p>
                    <p className="text-xs mt-1">Based on historical patterns and market sentiment</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-4">
          <TechnicalIndicators indicators={mockTechnicalIndicators} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-7">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-heading">F&O Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-nifty">Nifty Option Chain Analysis</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Put-Call Ratio (PCR):</span>
                      <span className="font-medium">1.02</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Max Pain:</span>
                      <span className="font-medium">22,400</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Highest Call OI:</span>
                      <span className="font-medium">22,500 Strike</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Highest Put OI:</span>
                      <span className="font-medium">22,300 Strike</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-nifty">Bank Nifty Option Chain Analysis</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Put-Call Ratio (PCR):</span>
                      <span className="font-medium">0.95</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Max Pain:</span>
                      <span className="font-medium">48,200</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Highest Call OI:</span>
                      <span className="font-medium">48,500 Strike</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-600">Highest Put OI:</span>
                      <span className="font-medium">47,800 Strike</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-nifty">Future OI Analysis</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm mb-2">Top OI Gainers</div>
                    <div className="flex justify-between items-center text-xs">
                      <span>RELIANCE</span>
                      <span className="text-profit">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span>BHARTIARTL</span>
                      <span className="text-profit">+8.3%</span>
                    </div>
                    
                    <div className="text-sm mb-2 mt-3">Top OI Losers</div>
                    <div className="flex justify-between items-center text-xs">
                      <span>INFY</span>
                      <span className="text-loss">-9.2%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <span>ADANIENT</span>
                      <span className="text-loss">-7.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-5">
          <AIInsights analysis={mockAIAnalysis} />
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Technical analysis should be used in conjunction with fundamental analysis and risk management.</p>
        <p>All insights are for informational purposes only, not direct buy/sell advice. SEBI compliant.</p>
      </div>
    </Layout>
  );
};

export default Analysis;
