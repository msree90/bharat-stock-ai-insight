
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StockData } from '@/types/stock';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface StockListProps {
  stocks: StockData[];
  title?: string;
}

const StockList = ({ stocks, title = 'Top Stocks' }: StockListProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>LTP (₹)</TableHead>
              <TableHead>Change</TableHead>
              <TableHead className="hidden md:table-cell">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">
                  <div>{stock.symbol}</div>
                  <div className="text-xs text-gray-500">{stock.name}</div>
                </TableCell>
                <TableCell>{stock.price.toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`flex items-center ${
                        stock.change >= 0 ? 'text-profit' : 'text-loss'
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {(stock.volume / 1000).toFixed(1)}K
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockList;
