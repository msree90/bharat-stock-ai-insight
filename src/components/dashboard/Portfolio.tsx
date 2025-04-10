
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortfolioItem } from '@/types/stock';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio = ({ items }: PortfolioProps) => {
  const totalValue = items.reduce((sum, item) => sum + (item.totalValue || 0), 0);
  const totalInvested = items.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercent = (totalProfit / totalInvested) * 100;

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading">My Portfolio</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total Value</div>
            <div className="text-lg font-semibold">₹{totalValue.toLocaleString('en-IN')}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Today's P&L</div>
            <div className={`text-lg font-semibold ${totalProfit >= 0 ? 'text-profit' : 'text-loss'}`}>
              {totalProfit >= 0 ? '+' : ''}₹{Math.abs(totalProfit).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg col-span-2 md:col-span-1">
            <div className="text-sm text-gray-600 mb-1">Overall Return</div>
            <div className={`text-lg font-semibold flex items-center ${totalProfitPercent >= 0 ? 'text-profit' : 'text-loss'}`}>
              {totalProfitPercent >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(totalProfitPercent).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <h3 className="font-medium">{item.symbol}</h3>
                <p className="text-xs text-gray-500">{item.quantity} shares</p>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{item.currentPrice.toLocaleString('en-IN')}</div>
                <div
                  className={`flex items-center justify-end text-xs ${
                    item.profitPercent && item.profitPercent >= 0 ? 'text-profit' : 'text-loss'
                  }`}
                >
                  {item.profitPercent && item.profitPercent >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {item.profitPercent ? Math.abs(item.profitPercent).toFixed(2) : 0}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
