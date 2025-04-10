
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WatchlistItem } from '@/types/stock';
import { ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WatchlistProps {
  items: WatchlistItem[];
}

const Watchlist = ({ items }: WatchlistProps) => {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-heading">My Watchlist</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Star
                  className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-medium">{item.symbol}</h3>
                  <p className="text-xs text-gray-500">{item.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{item.price.toLocaleString('en-IN')}</div>
                <div
                  className={`flex items-center justify-end text-xs ${
                    item.change >= 0 ? 'text-profit' : 'text-loss'
                  }`}
                >
                  {item.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(item.changePercent).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Watchlist;
