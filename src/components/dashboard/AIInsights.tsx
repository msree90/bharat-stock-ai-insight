
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIAnalysis } from '@/types/stock';
import { CheckCircle2, XCircle, AlertCircle, Brain } from 'lucide-react';

interface AIInsightsProps {
  analysis: AIAnalysis;
}

const AIInsights = ({ analysis }: AIInsightsProps) => {
  const getTrendClass = (trend: 'bullish' | 'bearish' | 'neutral') => {
    switch (trend) {
      case 'bullish':
        return 'text-profit';
      case 'bearish':
        return 'text-loss';
      default:
        return 'text-gray-600';
    }
  };

  const getSignalIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return <CheckCircle2 className="h-4 w-4 text-profit" />;
      case 'negative':
        return <XCircle className="h-4 w-4 text-loss" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Brain className="h-5 w-5 text-nifty" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Market Prediction</h3>
              <div className={`font-medium ${getTrendClass(analysis.trend)}`}>
                {analysis.trend.toUpperCase()}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{analysis.prediction}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysis.trend === 'bullish' 
                    ? 'bg-profit' 
                    : analysis.trend === 'bearish' 
                    ? 'bg-loss' 
                    : 'bg-gray-400'
                }`} 
                style={{ width: `${analysis.confidence}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              Confidence: {analysis.confidence}%
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Signal Analysis</h3>
            <div className="space-y-2">
              {analysis.signals.map((signal, index) => (
                <div key={index} className="flex items-start gap-2">
                  {getSignalIcon(signal.type)}
                  <div>
                    <div className="text-sm font-medium">{signal.name}</div>
                    <div className="text-xs text-gray-600">{signal.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
