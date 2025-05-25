
import { useState } from 'react';
import { ArrowLeft, Store, Users, TrendingUp, Settings, Plus, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface BusinessPortalProps {
  onBack: () => void;
}

interface Customer {
  id: string;
  phone: string;
  visits: number;
  rewards: number;
  lastVisit: string;
  totalSpent: number;
}

const BusinessPortal = ({ onBack }: BusinessPortalProps) => {
  const [customerPhone, setCustomerPhone] = useState('');
  const [rewardThreshold, setRewardThreshold] = useState(5);
  const [businessName, setBusinessName] = useState('Bella Vista Salon');
  const { toast } = useToast();

  // Mock business data
  const mockCustomers: Customer[] = [
    {
      id: '1',
      phone: '(555) 123-4567',
      visits: 7,
      rewards: 1,
      lastVisit: '2024-05-20',
      totalSpent: 420
    },
    {
      id: '2',
      phone: '(555) 987-6543',
      visits: 3,
      rewards: 0,
      lastVisit: '2024-05-18',
      totalSpent: 180
    },
    {
      id: '3',
      phone: '(555) 456-7890',
      visits: 12,
      rewards: 2,
      lastVisit: '2024-05-22',
      totalSpent: 720
    }
  ];

  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setCustomerPhone(formatted);
  };

  const handleCheckIn = () => {
    if (!customerPhone.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter a customer's phone number.",
        variant: "destructive"
      });
      return;
    }

    const existingCustomer = customers.find(c => c.phone === customerPhone);
    
    if (existingCustomer) {
      const updatedCustomers = customers.map(c => 
        c.phone === customerPhone 
          ? { 
              ...c, 
              visits: c.visits + 1,
              lastVisit: new Date().toISOString().split('T')[0],
              rewards: Math.floor((c.visits + 1) / rewardThreshold) - Math.floor(c.visits / rewardThreshold) > 0 
                ? c.rewards + 1 
                : c.rewards
            }
          : c
      );
      setCustomers(updatedCustomers);
      
      const newReward = Math.floor((existingCustomer.visits + 1) / rewardThreshold) > Math.floor(existingCustomer.visits / rewardThreshold);
      
      toast({
        title: newReward ? "🎉 Reward Earned!" : "Visit Logged",
        description: newReward 
          ? `Customer earned a new reward! Total visits: ${existingCustomer.visits + 1}`
          : `Customer visit logged. Total visits: ${existingCustomer.visits + 1}`,
      });
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        phone: customerPhone,
        visits: 1,
        rewards: 0,
        lastVisit: new Date().toISOString().split('T')[0],
        totalSpent: 0
      };
      setCustomers([...customers, newCustomer]);
      
      toast({
        title: "New Customer Added",
        description: "Customer's first visit logged successfully!",
      });
    }
    
    setCustomerPhone('');
  };

  const totalVisits = customers.reduce((sum, customer) => sum + customer.visits, 0);
  const totalRewards = customers.reduce((sum, customer) => sum + customer.rewards, 0);
  const activeCustomers = customers.filter(c => {
    const lastVisit = new Date(c.lastVisit);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastVisit > thirtyDaysAgo;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-loyalty-purple/10 via-white to-loyalty-blue/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg loyalty-gradient flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Business Portal</h1>
                <p className="text-sm text-gray-600">{businessName}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="checkin" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="checkin">Check-In</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Check-In Tab */}
          <TabsContent value="checkin" className="space-y-6">
            <Card className="glass-card max-w-md mx-auto animate-fade-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl loyalty-gradient flex items-center justify-center">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Customer Check-In</CardTitle>
                <CardDescription>
                  Log a customer visit to track their loyalty progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Customer Phone Number</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    maxLength={14}
                    className="text-lg text-center"
                  />
                </div>
                <Button 
                  onClick={handleCheckIn}
                  className="w-full loyalty-gradient text-white hover:opacity-90"
                  size="lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Log Visit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-loyalty-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-loyalty-purple">{customers.length}</div>
                  <p className="text-xs text-gray-600">
                    {activeCustomers} active this month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                  <TrendingUp className="h-4 w-4 text-loyalty-emerald" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-loyalty-emerald">{totalVisits}</div>
                  <p className="text-xs text-gray-600">
                    Avg {(totalVisits / customers.length).toFixed(1)} per customer
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
                  <Store className="h-4 w-4 text-loyalty-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-loyalty-orange">{totalRewards}</div>
                  <p className="text-xs text-gray-600">
                    {((totalRewards / totalVisits) * 100).toFixed(1)}% reward rate
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>
                  View and manage your loyal customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white/50">
                      <div className="flex-1">
                        <div className="font-medium">{customer.phone}</div>
                        <div className="text-sm text-gray-600">
                          Last visit: {new Date(customer.lastVisit).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-loyalty-purple">{customer.visits}</div>
                        <div className="text-xs text-gray-600">visits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-loyalty-emerald">{customer.rewards}</div>
                        <div className="text-xs text-gray-600">rewards</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Business Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rewardThreshold">Visits Required for Reward</Label>
                  <Input
                    id="rewardThreshold"
                    type="number"
                    value={rewardThreshold}
                    onChange={(e) => setRewardThreshold(Number(e.target.value))}
                    min="1"
                    max="20"
                  />
                  <p className="text-xs text-gray-600">
                    Customers earn a reward every {rewardThreshold} visits
                  </p>
                </div>
                <Button className="w-full loyalty-gradient text-white hover:opacity-90">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessPortal;
