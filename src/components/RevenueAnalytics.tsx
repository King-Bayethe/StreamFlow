import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Crown,
  Gift,
  Eye,
  Download,
  CreditCard,
  BarChart3,
  PieChart,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueData {
  period: string;
  superChats: number;
  polls: number;
  subscriptions: number;
  total: number;
}

interface TopSupporter {
  id: string;
  username: string;
  avatar?: string;
  totalSpent: number;
  contributions: number;
  lastContribution: Date;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

interface PayoutData {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: Date;
  method: string;
  fees: number;
}

const RevenueAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topSupporters, setTopSupporters] = useState<TopSupporter[]>([]);
  const [payouts, setPayouts] = useState<PayoutData[]>([]);

  // Mock data
  useEffect(() => {
    const mockRevenueData: RevenueData[] = [
      { period: 'Jan 1', superChats: 145.50, polls: 89.25, subscriptions: 299.99, total: 534.74 },
      { period: 'Jan 2', superChats: 178.25, polls: 65.00, subscriptions: 299.99, total: 543.24 },
      { period: 'Jan 3', superChats: 203.75, polls: 124.50, subscriptions: 299.99, total: 628.24 },
      { period: 'Jan 4', superChats: 156.25, polls: 78.75, subscriptions: 299.99, total: 534.99 },
      { period: 'Jan 5', superChats: 234.50, polls: 156.25, subscriptions: 299.99, total: 690.74 },
      { period: 'Jan 6', superChats: 189.75, polls: 98.50, subscriptions: 299.99, total: 588.24 },
      { period: 'Jan 7', superChats: 267.25, polls: 187.50, subscriptions: 299.99, total: 754.74 }
    ];
    setRevenueData(mockRevenueData);

    const mockTopSupporters: TopSupporter[] = [
      {
        id: '1',
        username: 'SuperFan123',
        totalSpent: 450.75,
        contributions: 23,
        lastContribution: new Date(Date.now() - 3600000),
        tier: 'diamond'
      },
      {
        id: '2',
        username: 'StreamLover',
        totalSpent: 289.50,
        contributions: 15,
        lastContribution: new Date(Date.now() - 7200000),
        tier: 'gold'
      },
      {
        id: '3',
        username: 'BigTipper',
        totalSpent: 234.25,
        contributions: 12,
        lastContribution: new Date(Date.now() - 10800000),
        tier: 'gold'
      },
      {
        id: '4',
        username: 'ChatKing',
        totalSpent: 156.00,
        contributions: 8,
        lastContribution: new Date(Date.now() - 14400000),
        tier: 'silver'
      }
    ];
    setTopSupporters(mockTopSupporters);

    const mockPayouts: PayoutData[] = [
      {
        id: '1',
        amount: 1250.75,
        status: 'completed',
        date: new Date(Date.now() - 604800000),
        method: 'Bank Transfer',
        fees: 12.51
      },
      {
        id: '2',
        amount: 987.50,
        status: 'processing',
        date: new Date(Date.now() - 172800000),
        method: 'PayPal',
        fees: 29.63
      },
      {
        id: '3',
        amount: 2145.25,
        status: 'pending',
        date: new Date(),
        method: 'Stripe',
        fees: 64.36
      }
    ];
    setPayouts(mockPayouts);
  }, [timeRange]);

  const getTierColor = (tier: TopSupporter['tier']) => {
    switch (tier) {
      case 'diamond': return 'bg-blue-500';
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-amber-600';
      default: return 'bg-gray-300';
    }
  };

  const getTierIcon = (tier: TopSupporter['tier']) => {
    switch (tier) {
      case 'diamond':
      case 'gold':
        return <Crown className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  const totalRevenue = revenueData.reduce((sum, data) => sum + data.total, 0);
  const totalSuperChats = revenueData.reduce((sum, data) => sum + data.superChats, 0);
  const totalPolls = revenueData.reduce((sum, data) => sum + data.polls, 0);
  const totalSubscriptions = revenueData.reduce((sum, data) => sum + data.subscriptions, 0);
  
  const revenueGrowth = revenueData.length > 1 
    ? ((revenueData[revenueData.length - 1].total - revenueData[revenueData.length - 2].total) / revenueData[revenueData.length - 2].total) * 100
    : 0;

  const pieData = [
    { name: 'Super Chats', value: totalSuperChats, color: '#8b5cf6' },
    { name: 'Paid Polls', value: totalPolls, color: '#06d6a0' },
    { name: 'Subscriptions', value: totalSubscriptions, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Revenue Analytics
          </h3>
          <p className="text-muted-foreground">Track your earnings and payment performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </Button>
          <Button
            variant={timeRange === '1y' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('1y')}
          >
            1 Year
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                <div className={`flex items-center gap-1 text-sm ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueGrowth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Super Chats</p>
                <p className="text-2xl font-bold">${totalSuperChats.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {((totalSuperChats / totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
              <Gift className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Polls</p>
                <p className="text-2xl font-bold">${totalPolls.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {((totalPolls / totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subscriptions</p>
                <p className="text-2xl font-bold">${totalSubscriptions.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {((totalSubscriptions / totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="supporters">Top Supporters</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="superChats" stackId="a" fill="#8b5cf6" name="Super Chats" />
                  <Bar dataKey="polls" stackId="a" fill="#06d6a0" name="Paid Polls" />
                  <Bar dataKey="subscriptions" stackId="a" fill="#f59e0b" name="Subscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supporters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Top Supporters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSupporters.map((supporter, index) => (
                  <div key={supporter.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={supporter.avatar} />
                          <AvatarFallback>{supporter.username[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{supporter.username}</span>
                          <Badge 
                            variant="secondary" 
                            className={`${getTierColor(supporter.tier)} text-white`}
                          >
                            <span className="flex items-center gap-1">
                              {getTierIcon(supporter.tier)}
                              {supporter.tier}
                            </span>
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {supporter.contributions} contributions • Last: {supporter.lastContribution.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${supporter.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total contributed</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">$3,247.82</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Payouts</p>
                    <p className="text-2xl font-bold">$2,145.25</p>
                  </div>
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Paid Out</p>
                    <p className="text-2xl font-bold">$12,456.78</p>
                  </div>
                  <Download className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Payout History</span>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${payout.amount.toFixed(2)}</span>
                          <Badge 
                            variant={
                              payout.status === 'completed' ? 'default' :
                              payout.status === 'processing' ? 'secondary' :
                              payout.status === 'pending' ? 'outline' : 'destructive'
                            }
                          >
                            {payout.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payout.method} • {payout.date.toLocaleDateString()} • Fees: ${payout.fees.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(payout.amount - payout.fees).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Net amount</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Super Chats</span>
                    <span className="font-semibold">${totalSuperChats.toFixed(2)}</span>
                  </div>
                  <Progress value={(totalSuperChats / totalRevenue) * 100} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Paid Polls</span>
                    <span className="font-semibold">${totalPolls.toFixed(2)}</span>
                  </div>
                  <Progress value={(totalPolls / totalRevenue) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subscriptions</span>
                    <span className="font-semibold">${totalSubscriptions.toFixed(2)}</span>
                  </div>
                  <Progress value={(totalSubscriptions / totalRevenue) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${(totalRevenue / revenueData.length).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Daily Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">
                      {topSupporters.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Supporters</div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="text-sm text-muted-foreground mb-2">Revenue Growth</div>
                  <div className={`text-2xl font-bold ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueAnalytics;