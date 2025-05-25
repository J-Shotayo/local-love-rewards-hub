
import { useState } from 'react';
import { ArrowLeft, Phone, Gift, Star, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CustomerPortalProps {
  onBack: () => void;
}

interface CustomerData {
  phone: string;
  visits: number;
  rewards: number;
  businessName: string;
  rewardThreshold: number;
  lastVisit: string;
}

const CustomerPortal = ({ onBack }: CustomerPortalProps) => {
  const [phone, setPhone] = useState('');
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demo
  const mockCustomerData: CustomerData = {
    phone: '',
    visits: 7,
    rewards: 1,
    businessName: 'Bella Vista Salon',
    rewardThreshold: 5,
    lastVisit: '2024-05-20'
  };

  const handleLookup = async () => {
    if (!phone.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to check rewards.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCustomerData({ ...mockCustomerData, phone });
      setLoading(false);
      toast({
        title: "Rewards found!",
        description: "Your loyalty status has been loaded.",
      });
    }, 1000);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const visitsToNextReward = customerData 
    ? Math.max(0, customerData.rewardThreshold - (customerData.visits % customerData.rewardThreshold))
    : 0;

  const progressPercentage = customerData
    ? ((customerData.visits % customerData.rewardThreshold) / customerData.rewardThreshold) * 100
    : 0;

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
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">My Rewards</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {!customerData ? (
          // Phone Input Section
          <Card className="glass-card animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl loyalty-gradient flex items-center justify-center">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Check Your Rewards</CardTitle>
              <CardDescription>
                Enter your phone number to see your loyalty points and rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                  className="text-lg text-center"
                />
              </div>
              <Button 
                onClick={handleLookup}
                disabled={loading}
                className="w-full loyalty-gradient text-white hover:opacity-90"
                size="lg"
              >
                {loading ? "Looking up..." : "Check My Rewards"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Customer Data Display
          <div className="space-y-6 animate-fade-in">
            {/* Welcome Card */}
            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back!</CardTitle>
                <CardDescription>{customerData.businessName}</CardDescription>
              </CardHeader>
            </Card>

            {/* Progress Card */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-loyalty-orange" />
                  Loyalty Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-loyalty-purple mb-2">
                    {customerData.visits}
                  </div>
                  <p className="text-gray-600">Total Visits</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next reward</span>
                    <span>{visitsToNextReward} visits left</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="loyalty-gradient h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  Earn a reward every {customerData.rewardThreshold} visits
                </div>
              </CardContent>
            </Card>

            {/* Rewards Card */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-loyalty-emerald" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                {customerData.rewards > 0 ? (
                  <div className="text-center p-6 rounded-lg success-gradient text-white">
                    <Gift className="h-12 w-12 mx-auto mb-4" />
                    <div className="text-2xl font-bold mb-2">
                      {customerData.rewards} Reward{customerData.rewards > 1 ? 's' : ''} Available!
                    </div>
                    <p className="text-green-100">
                      Show this to redeem at {customerData.businessName}
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-6 rounded-lg bg-gray-50">
                    <Coffee className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">
                      No rewards available yet. Keep visiting to earn rewards!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Last Visit */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Visit</span>
                  <span className="font-medium">
                    {new Date(customerData.lastVisit).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Check Another Number */}
            <Button 
              variant="outline" 
              onClick={() => setCustomerData(null)}
              className="w-full border-loyalty-purple/30 hover:bg-loyalty-purple/5"
            >
              Check Different Number
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPortal;
