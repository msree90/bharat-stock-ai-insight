
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types/stock';
import { cn } from '@/lib/utils';

const AIChatAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI market assistant. Ask me anything about Indian stocks, market trends, or technical analysis.',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);

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

    // Simulate assistant response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('bullish')) {
        response = 'Based on my analysis, some bullish stocks today include RELIANCE, BHARTIARTL, and HDFCBANK due to positive momentum and strong buying support.';
      } else if (input.toLowerCase().includes('bank nifty') || input.toLowerCase().includes('oi')) {
        response = 'Bank Nifty\'s OI trend shows more call writing at 48,500 strike, suggesting resistance at that level. There\'s put unwinding at 47,800, indicating support formation.';
      } else if (input.toLowerCase().includes('f&o') || input.toLowerCase().includes('picks')) {
        response = 'For high-risk F&O trades, you might consider BAJFINANCE long (with strict stop loss) as it shows positive OI buildup. Please do your own research before trading - this is not investment advice.';
      } else if (input.toLowerCase().includes('nifty')) {
        response = 'Nifty is currently in a consolidation phase with support at 22,350 and resistance at 22,550. The PCR is at 1.02, suggesting a balanced sentiment.';
      } else {
        response = 'I\'m analyzing the markets based on your question. For specific insights, try asking about bullish stocks, OI trends, or technical patterns for specific securities.';
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Bot className="h-5 w-5 text-nifty" />
          Market Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow overflow-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2",
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
                  "px-3 py-2 rounded-lg max-w-[80%]",
                  message.sender === 'user'
                    ? "bg-nifty text-white"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
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
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask about market trends, stocks..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          All insights are AI-generated and not financial advice. SEBI compliant.
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatAssistant;
