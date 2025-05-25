
import { useState } from 'react';
import { Phone, Store, Users, Gift, Smartphone, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CustomerPortal from '@/components/CustomerPortal';
import BusinessPortal from '@/components/BusinessPortal';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'customer' | 'business'>('home');

  if (activeTab === 'customer') {
    return <CustomerPortal onBack={() => setActiveTab('home')} />;
  }

  if (activeTab === 'business') {
    return <BusinessPortal onBack={() => setActiveTab('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-loyalty-purple/10 via-white to-loyalty-blue/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg loyalty-gradient flex items-center justify-center">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Local Loyalty</h1>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('customer')}
                className="hover:bg-loyalty-purple/10"
              >
                <Phone className="h-4 w-4 mr-2" />
                Check Rewards
              </Button>
              <Button 
                onClick={() => setActiveTab('business')}
                className="loyalty-gradient text-white hover:opacity-90"
              >
                <Store className="h-4 w-4 mr-2" />
                Business Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Simple Loyalty</span>
            <br />
            <span className="text-gray-900">Big Results</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Help your local business retain customers with a phone-number-based loyalty system. 
            No apps to download, no cards to carry.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => setActiveTab('business')}
              className="loyalty-gradient text-white hover:opacity-90 px-8 py-4 text-lg"
            >
              <Store className="h-5 w-5 mr-2" />
              Start Your Business
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setActiveTab('customer')}
              className="border-loyalty-purple/30 hover:bg-loyalty-purple/5 px-8 py-4 text-lg"
            >
              <Phone className="h-5 w-5 mr-2" />
              Check My Rewards
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three simple steps to build customer loyalty and grow your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card hover:shadow-2xl transition-all duration-300 animate-slide-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl loyalty-gradient flex items-center justify-center">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Customer Checks In</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                Customers simply provide their phone number at checkout. No apps or cards needed.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-2xl transition-all duration-300 animate-slide-up delay-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl success-gradient flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Visits Are Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                Every visit is automatically logged and counted toward their next reward.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-2xl transition-all duration-300 animate-slide-up delay-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-warning flex items-center justify-center">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Rewards Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">
                After reaching the visit threshold, customers automatically earn rewards.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Perfect For</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <span className="text-2xl">💇‍♀️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Salons & Spas</h4>
              <p className="text-gray-600">Reward regular appointments and build lasting relationships</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <span className="text-2xl">✂️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Barbershops</h4>
              <p className="text-gray-600">Keep customers coming back for that perfect cut</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Restaurants</h4>
              <p className="text-gray-600">Turn occasional diners into regular customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <section className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <Button 
            className="flex-1 loyalty-gradient text-white"
            onClick={() => setActiveTab('business')}
          >
            <Store className="h-4 w-4 mr-2" />
            Business
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-loyalty-purple/30"
            onClick={() => setActiveTab('customer')}
          >
            <Phone className="h-4 w-4 mr-2" />
            Rewards
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mb-20 md:mb-0">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg loyalty-gradient flex items-center justify-center">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Local Loyalty</h2>
          </div>
          <p className="text-gray-400 mb-4">Simple loyalty rewards for local businesses</p>
          <p className="text-sm text-gray-500">© 2025 Local Loyalty.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
