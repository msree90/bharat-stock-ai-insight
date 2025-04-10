
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Bot as BotIcon, RefreshCw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/stock';

const AI_SUGGESTIONS = [
  "Which stocks are bullish today?",
  "Explain Bank Nifty's OI trend",
  "Show me high-risk F&O picks",
  "What's the outlook for Nifty this week?",
  "How's the PCR for Nifty options?",
  "Explain today's market sentiment",
  "Which sectors are outperforming?"
];

const Assistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI market assistant. Ask me anything about Indian stocks, market trends, technical analysis, or F&O data.",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate assistant response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('bullish')) {
        response = 'Based on my analysis, some bullish stocks today include RELIANCE, BHARTIARTL, and HDFCBANK due to positive momentum and strong buying support. These stocks show increased OI in futures and higher call writing, suggesting potential upside momentum. Technical indicators like RSI and MACD also show bullish divergence.';
      } else if (input.toLowerCase().includes('bank nifty') || input.toLowerCase().includes('oi trend')) {
        response = 'Bank Nifty\'s OI trend shows more call writing at 48,500 strike, suggesting resistance at that level. There\'s put unwinding at 47,800, indicating support formation. Current PCR is 0.95, showing slightly bullish sentiment. Bank Nifty futures have seen fresh long positions in the last 3 sessions, with OI increase of 8.3% alongside price rise. This suggests institutional buying interest.';
      } else if (input.toLowerCase().includes('f&o') || input.toLowerCase().includes('picks')) {
        response = 'For high-risk F&O trades, you might consider:\n\n1. BAJFINANCE (long) - Showing positive OI buildup with technical breakout above 6,950\n\n2. BHARTIARTL (long) - Increasing volumes and OI, support at 1,220\n\n3. INFY (short) - Bearish engulfing pattern with resistance at 1,480\n\nAlways use strict stop-losses and position sizing. This is for informational purposes only and not investment advice. SEBI compliant disclaimer applies.';
      } else if (input.toLowerCase().includes('nifty')) {
        response = 'Nifty is currently in a consolidation phase with support at 22,350 and resistance at 22,550. The PCR is at 1.02, suggesting a balanced sentiment. Technical indicators: RSI at 58.35 (neutral), MACD showing bullish crossover, and Bollinger Bands indicating reduced volatility. FIIs have been net sellers (-₹1,245 Cr) while DIIs remain buyers (+₹1,876 Cr). Key levels to watch: Support at 22,350, 22,200. Resistance at 22,550, 22,700.';
      } else if (input.toLowerCase().includes('pcr')) {
        response = 'The current Put-Call Ratio (PCR) for Nifty options is 1.02, indicating a relatively balanced market sentiment with a slight bullish bias. A PCR above 1 generally suggests more put buying compared to calls, which can be interpreted as traders hedging long positions or speculating on downside. The PCR has increased from 0.94 yesterday, showing improving sentiment. For Bank Nifty, the PCR is currently at 0.95, slightly bearish. The PCR trend over the past week has been gradually increasing from 0.85 levels.';
      } else if (input.toLowerCase().includes('sentiment') || input.toLowerCase().includes('market sentiment')) {
        response = 'Today\'s market sentiment analysis shows a cautiously optimistic outlook. News sentiment from major financial portals (Economic Times, Moneycontrol) is 65% positive. Social media sentiment analysis shows bullish bias at 58%. Most discussed sectors are Banking, IT, and Energy. Institutional activity shows DIIs buying while FIIs remain net sellers. The fear & greed index is at 62 (Greed zone), up from 55 last week. Overall market breadth is positive with advance-decline ratio at 1.8:1.';
      } else if (input.toLowerCase().includes('sector') || input.toLowerCase().includes('outperforming')) {
        response = 'Currently outperforming sectors in the Indian market are:\n\n1. Banking & Financial Services (+1.2%) - Led by HDFCBANK, SBIN\n2. Energy (+0.9%) - Led by RELIANCE, NTPC\n3. Telecom (+0.8%) - Led by BHARTIARTL\n\nUnderperforming sectors include:\n1. IT (-0.7%) - Dragged by TCS, INFY\n2. Metals (-0.5%) - Weakness in TATASTEEL, HINDALCO\n\nSector rotation suggests money flowing from IT into Banking. PSU banks showing particular strength with SBI leading gains.';
      } else {
        response = 'I\'m analyzing the markets based on your question. For specific insights, try asking about bullish stocks, OI trends, technical patterns, or sector performance. You can also ask about specific stocks, F&O data, or market sentiment analysis. I\'m designed to provide SEBI-compliant information without direct buy/sell advice.';
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setLoading(false);
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Optional: immediately send the message
    // setInput(suggestion);
    // setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">AI Market Assistant</h1>
        <p className="text-gray-600">
          Get real-time insights and answers about Indian markets
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-9">
          <Card className="h-[calc(100vh-240px)] flex flex-col p-4">
            <div className="flex-grow overflow-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2 mb-4",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-nifty flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "px-4 py-3 rounded-lg max-w-[80%]",
                      message.sender === 'user'
                        ? "bg-nifty text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    )}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-700" />
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-nifty flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-white animate-spin" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <div className="flex space-x-2 items-center">
                      <div className="h-2 w-2 bg-nifty rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-nifty rounded-full animate-pulse delay-100"></div>
                      <div className="h-2 w-2 bg-nifty rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask about market trends, stocks, F&O data..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-grow"
                disabled={loading}
              />
              <Button onClick={handleSendMessage} disabled={loading || !input.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card className="h-full p-4">
            <div className="flex items-center gap-2 mb-4">
              <BotIcon className="h-5 w-5 text-nifty" />
              <h2 className="font-semibold">AI Assistant</h2>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              Ask me anything about Indian markets, stocks, technical analysis, or F&O data.
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-medium">Try asking</h3>
              </div>
              
              <div className="space-y-2">
                {AI_SUGGESTIONS.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 p-2 rounded-md text-sm cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 pt-3 border-t">
              <p className="mb-1">This AI assistant provides SEBI-compliant market analysis without direct buy/sell recommendations.</p>
              <p>All insights are for informational purposes only.</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Assistant;
