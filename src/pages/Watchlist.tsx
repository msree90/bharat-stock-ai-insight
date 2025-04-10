
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStocks, mockWatchlist } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  Trash2
} from 'lucide-react';
import { WatchlistItem } from '@/types/stock';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemoveItem = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
  };

  const handleAddStock = () => {
    if (!searchTerm) return;
    
    const stockToAdd = mockStocks.find(
      stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (stockToAdd && !watchlist.some(item => item.symbol === stockToAdd.symbol)) {
      const newItem: WatchlistItem = {
        ...stockToAdd,
        id: Date.now().toString()
      };
      
      setWatchlist([...watchlist, newItem]);
      setSearchTerm('');
    }
  };

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">My Watchlist</h1>
        <p className="text-gray-600">
          Track your favorite stocks and set price alerts
        </p>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading">Add Stocks to Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search stocks by name or symbol..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
              />
            </div>
            <Button onClick={handleAddStock}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          
          {searchTerm && (
            <div className="mt-2 bg-white border rounded-lg shadow-sm max-h-40 overflow-auto">
              {mockStocks
                .filter(stock => 
                  stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  stock.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, 5)
                .map(stock => (
                  <div 
                    key={stock.symbol}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(stock.symbol);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-gray-500">{stock.name}</div>
                      </div>
                      <div>{stock.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading">My Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          {watchlist.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Your watchlist is empty</p>
              <p className="text-sm mt-1">Search and add stocks to track them</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {watchlist.map((item) => (
                <div key={item.id} className="stock-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" strokeWidth={1.5} />
                        <h3 className="font-semibold">{item.symbol}</h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.name}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-loss" />
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-2xl font-bold">₹{item.price.toLocaleString('en-IN')}</div>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`flex items-center ${
                          item.change >= 0 ? 'text-profit' : 'text-loss'
                        }`}
                      >
                        {item.change >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({Math.abs(item.changePercent).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 p-1.5 rounded">
                      <span className="text-gray-500">Open</span>
                      <div>₹{item.open?.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="bg-gray-50 p-1.5 rounded">
                      <span className="text-gray-500">Prev. Close</span>
                      <div>₹{item.previousClose?.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="bg-gray-50 p-1.5 rounded">
                      <span className="text-gray-500">Day High</span>
                      <div>₹{item.dayHigh?.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="bg-gray-50 p-1.5 rounded">
                      <span className="text-gray-500">Day Low</span>
                      <div>₹{item.dayLow?.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <Button variant="outline" size="sm" className="text-xs">
                      Set Alert
                    </Button>
                    <Button size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Updates are delivered in real-time for NSE/BSE listed securities.</p>
      </div>
    </Layout>
  );
};

export default Watchlist;
