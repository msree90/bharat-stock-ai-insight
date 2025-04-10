
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Mail, Phone, ClipboardList, AlertTriangle, BellRing, Smartphone, Settings as SettingsIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { StockData } from '@/types/stock';
import { mockStocks } from '@/data/mockData';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('alerts');
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('price');
  const [alertPrice, setAlertPrice] = useState<string>('');
  const [alertPercentage, setAlertPercentage] = useState<string>('');
  const [notifyVia, setNotifyVia] = useState({
    app: true,
    sms: false,
    email: false
  });
  
  const [marketAlerts, setMarketAlerts] = useState({
    marketOpen: true,
    marketClose: true,
    significantMovements: false
  });
  
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    stock: StockData;
    type: string;
    value: string;
    active: boolean;
  }>>([]);

  const handleCreateAlert = () => {
    if (!selectedStock) {
      toast({
        title: "Error",
        description: "Please select a stock for your alert",
        variant: "destructive"
      });
      return;
    }

    const stock = mockStocks.find(s => s.symbol === selectedStock);
    
    if (!stock) {
      toast({
        title: "Error",
        description: "Selected stock not found",
        variant: "destructive"
      });
      return;
    }

    if (alertType === 'price' && !alertPrice) {
      toast({
        title: "Error",
        description: "Please enter a price for your alert",
        variant: "destructive"
      });
      return;
    }

    if (alertType === 'percentage' && !alertPercentage) {
      toast({
        title: "Error",
        description: "Please enter a percentage for your alert",
        variant: "destructive"
      });
      return;
    }

    const value = alertType === 'price' ? alertPrice : alertPercentage;

    const newAlert = {
      id: Date.now().toString(),
      stock,
      type: alertType,
      value,
      active: true
    };

    setAlerts([...alerts, newAlert]);
    
    // Reset form
    setSelectedStock('');
    setAlertPrice('');
    setAlertPercentage('');
    
    toast({
      title: "Alert Created",
      description: `Your ${alertType} alert for ${stock.symbol} has been created`,
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Your alert has been deleted",
    });
  };
  
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 font-heading">Settings</h1>
        <p className="text-gray-600">
          Manage your account preferences and alerts
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full md:w-auto md:inline-flex">
          <TabsTrigger value="alerts" className="flex items-center">
            <BellRing className="h-4 w-4 mr-2" />
            Price Alerts
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Alert</CardTitle>
              <CardDescription>
                Set alerts for price movements and get notified instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock/Symbol</Label>
                    <Select value={selectedStock} onValueChange={setSelectedStock}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a stock" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {mockStocks.map(stock => (
                          <SelectItem key={stock.symbol} value={stock.symbol}>
                            {stock.symbol} - {stock.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Alert Type</Label>
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant={alertType === 'price' ? 'default' : 'outline'} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setAlertType('price')}
                      >
                        Price
                      </Button>
                      <Button 
                        type="button" 
                        variant={alertType === 'percentage' ? 'default' : 'outline'} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setAlertType('percentage')}
                      >
                        Percentage
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  {alertType === 'price' ? (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        placeholder="Enter price value" 
                        value={alertPrice}
                        onChange={(e) => setAlertPrice(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="percentage">Percentage Change (%)</Label>
                      <Input 
                        id="percentage" 
                        type="number" 
                        placeholder="Enter percentage change" 
                        value={alertPercentage}
                        onChange={(e) => setAlertPercentage(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Notify via</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="app-notify" 
                        checked={notifyVia.app} 
                        onCheckedChange={(checked) => setNotifyVia({...notifyVia, app: checked === true})}
                      />
                      <Label htmlFor="app-notify" className="cursor-pointer">App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sms-notify" 
                        checked={notifyVia.sms} 
                        onCheckedChange={(checked) => setNotifyVia({...notifyVia, sms: checked === true})}
                      />
                      <Label htmlFor="sms-notify" className="cursor-pointer">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="email-notify" 
                        checked={notifyVia.email} 
                        onCheckedChange={(checked) => setNotifyVia({...notifyVia, email: checked === true})}
                      />
                      <Label htmlFor="email-notify" className="cursor-pointer">Email</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="button" 
                  className="w-full"
                  onClick={handleCreateAlert}
                >
                  Create Alert
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <Collapsible
                open={alertsExpanded}
                onOpenChange={setAlertsExpanded}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <CardTitle>Your Alerts</CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {alertsExpanded ? "Hide" : "Show"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="mt-4">
                  {alerts.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <BellRing className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>You don't have any active alerts</p>
                      <p className="text-sm mt-1">Create one using the form above</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {alerts.map(alert => (
                        <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex-1">
                            <div className="font-medium">{alert.stock.symbol}</div>
                            <div className="text-sm text-gray-600">
                              {alert.type === 'price' 
                                ? `Price alert: ₹${alert.value}` 
                                : `Change by ${alert.value}%`}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Switch
                              checked={alert.active}
                              onCheckedChange={() => toggleAlert(alert.id)}
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500"
                              onClick={() => deleteAlert(alert.id)}
                            >
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Alerts</CardTitle>
              <CardDescription>General market notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Market Open</Label>
                  <p className="text-sm text-gray-500">Get notified when the market opens</p>
                </div>
                <Switch 
                  checked={marketAlerts.marketOpen}
                  onCheckedChange={(checked) => setMarketAlerts({...marketAlerts, marketOpen: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Market Close</Label>
                  <p className="text-sm text-gray-500">Get notified when the market closes</p>
                </div>
                <Switch 
                  checked={marketAlerts.marketClose}
                  onCheckedChange={(checked) => setMarketAlerts({...marketAlerts, marketClose: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Significant Index Movements</Label>
                  <p className="text-sm text-gray-500">Alerts for major index changes (>1%)</p>
                </div>
                <Switch 
                  checked={marketAlerts.significantMovements}
                  onCheckedChange={(checked) => setMarketAlerts({...marketAlerts, significantMovements: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Color Theme</Label>
                  <p className="text-sm text-gray-500">Choose between light and dark mode</p>
                </div>
                <Select defaultValue="light">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Chart Type</Label>
                  <p className="text-sm text-gray-500">Default chart type</p>
                </div>
                <Select defaultValue="candle">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select chart" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candle">Candlestick</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Default Time Period</Label>
                  <p className="text-sm text-gray-500">Default timeframe for charts</p>
                </div>
                <Select defaultValue="1d">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <div className="space-y-0.5">
                    <Label className="text-base">App Notifications</Label>
                    <p className="text-sm text-gray-500">Show in-app notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive SMS alerts</p>
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email alerts</p>
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Send mobile push notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value="user@example.com" readOnly />
                </div>
                
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input value="+91 9876543210" readOnly />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Change Password</Button>
                  <Button>Update Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-xs text-center text-gray-500">
        <p>All alerts and notifications are indicative only and should not be considered as investment advice.</p>
        <p className="mt-1">© 2025 Bharat Stock AI Insight. All rights reserved.</p>
      </div>
    </Layout>
  );
};

export default Settings;
