
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndexData } from '@/types/stock';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketIndicesProps {
  indices: IndexData[];
}

const MarketIndices = ({ indices }: MarketIndicesProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading">Market Indices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {indices.map((index) => (
            <div key={index.name} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-700">{index.name}</h3>
                <div className={`flex items-center text-xs font-medium ${index.change >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {index.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(index.changePercent).toFixed(2)}%
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl font-semibold">{index.value.toLocaleString('en-IN')}</span>
                <span className={`ml-2 text-sm ${index.change >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIndices;
