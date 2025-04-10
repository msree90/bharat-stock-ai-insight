
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TechnicalIndicator } from '@/types/stock';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface TechnicalIndicatorsProps {
  indicators: TechnicalIndicator[];
}

const TechnicalIndicators = ({ indicators }: TechnicalIndicatorsProps) => {
  const getSignalIcon = (signal?: 'buy' | 'sell' | 'neutral') => {
    switch (signal) {
      case 'buy':
        return <ArrowUpRight className="h-4 w-4 text-profit" />;
      case 'sell':
        return <ArrowDownRight className="h-4 w-4 text-loss" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSignalClass = (signal?: 'buy' | 'sell' | 'neutral') => {
    switch (signal) {
      case 'buy':
        return 'text-profit bg-green-50';
      case 'sell':
        return 'text-loss bg-red-50';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading">Technical Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {indicators.map((indicator) => (
            <div key={indicator.name} className="p-3 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="text-sm font-medium text-gray-700">
                  {indicator.name}
                </div>
                <div 
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getSignalClass(indicator.signal)}`}
                >
                  {getSignalIcon(indicator.signal)}
                  {indicator.signal?.toUpperCase() || 'NEUTRAL'}
                </div>
              </div>
              <div className="mt-1 text-lg font-semibold">
                {typeof indicator.value === 'number' 
                  ? indicator.value.toLocaleString('en-IN') 
                  : indicator.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalIndicators;
