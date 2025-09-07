import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Search,
  BookOpen,
  Video,
  Users,
  Shield,
  CreditCard,
  Settings,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Download,
  ExternalLink,
  Send,
  Star,
  ArrowRight,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Support: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqCategories = [
    {
      id: 'streaming',
      title: 'Streaming Setup',
      icon: <Video className="h-5 w-5" />,
      questions: [
        {
          question: 'How do I start streaming?',
          answer: 'To start streaming, go to your Creator Dashboard, set up your stream title and description, then click "Go Live". Make sure you have OBS or similar streaming software configured with your RTMP settings.'
        },
        {
          question: 'What are the recommended streaming settings?',
          answer: 'For optimal quality, we recommend: 1080p resolution at 30fps, 2500-4000 kbps bitrate for video, and 128 kbps for audio. Use CBR rate control and x264 encoder for best compatibility.'
        },
        {
          question: 'Can I stream to multiple platforms at once?',
          answer: 'Yes! Our simulcasting feature allows you to stream to YouTube, Twitch, Rumble, and other platforms simultaneously while managing everything from one dashboard.'
        },
        {
          question: 'How do I set up OBS with the platform?',
          answer: 'In your Creator Dashboard, go to the Streaming tab to find your RTMP URL and Stream Key. In OBS, go to Settings > Stream, select "Custom" as service, enter your RTMP URL as server and your stream key.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: 'How do I verify my account?',
          answer: 'Account verification is automatic for creators who meet our criteria: 1000+ followers, regular streaming schedule, and good community standing. Verified accounts get a blue checkmark and priority support.'
        },
        {
          question: 'Can I change my username?',
          answer: 'Usernames can be changed once every 30 days from your Profile Settings. Note that changing your username will update your channel URL and may affect your SEO.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Account deletion is permanent and cannot be undone. Contact our support team to request account deletion. All content, followers, and earnings data will be permanently removed.'
        }
      ]
    },
    {
      id: 'monetization',
      title: 'Payments & Earnings',
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: 'How do paid messages work?',
          answer: 'Viewers can send paid messages during your stream by clicking the tip button in chat. You set the minimum amount (starting at $1). All paid messages are highlighted and pinned for visibility.'
        },
        {
          question: 'When do I get paid?',
          answer: 'Earnings are paid out weekly on Fridays for the previous week. Minimum payout is $50. Payments are processed via bank transfer or PayPal, depending on your preference.'
        },
        {
          question: 'What are the platform fees?',
          answer: 'We take a 15% platform fee on all earnings (tips, subscriptions, etc.). This covers payment processing, hosting, and platform maintenance. No hidden fees.'
        },
        {
          question: 'How do I track my earnings?',
          answer: 'Visit the Earnings tab in your Creator Dashboard for detailed analytics including total earnings, tips received, payout history, and tax documents.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      icon: <Settings className="h-5 w-5" />,
      questions: [
        {
          question: 'My stream keeps disconnecting',
          answer: 'Check your internet connection stability. Ensure you have sufficient upload bandwidth (at least 5 Mbps for 1080p). Try lowering your bitrate or switching to a different server in OBS.'
        },
        {
          question: 'Chat is not working',
          answer: 'Refresh the page and check if JavaScript is enabled in your browser. If using ad blockers, try disabling them temporarily. Clear your browser cache if the issue persists.'
        },
        {
          question: 'Video quality is poor',
          answer: 'Check your encoding settings in OBS. Ensure you\'re using the correct bitrate for your internet connection. Higher bitrates require stronger internet connections.'
        }
      ]
    },
    {
      id: 'policies',
      title: 'Policies & Guidelines',
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: 'What content is allowed?',
          answer: 'We allow most content types including gaming, music, art, tutorials, and live discussions. Prohibited content includes adult content, hate speech, harassment, and copyright violations.'
        },
        {
          question: 'How do I report inappropriate content?',
          answer: 'Use the report button on any stream or profile. Our moderation team reviews reports within 24 hours. For urgent issues, contact support directly.'
        },
        {
          question: 'What happens if I violate guidelines?',
          answer: 'Violations result in warnings, temporary suspensions, or permanent bans depending on severity. You\'ll receive an email explaining the violation and any appeal process.'
        }
      ]
    }
  ];

  const supportOptions = [
    {
      title: 'Live Chat Support',
      description: 'Chat with our support team in real-time',
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      availability: 'Available 24/7',
      action: 'Start Chat',
      badge: 'Fastest'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message and get a response within 24 hours',
      icon: <Mail className="h-8 w-8 text-green-500" />,
      availability: 'Response within 24h',
      action: 'Send Email',
      badge: 'Detailed'
    },
    {
      title: 'Phone Support',
      description: 'Call our support line for urgent issues',
      icon: <Phone className="h-8 w-8 text-purple-500" />,
      availability: 'Mon-Fri 9AM-6PM PST',
      action: 'Call Now',
      badge: 'Premium'
    },
    {
      title: 'Community Forum',
      description: 'Get help from the creator community',
      icon: <Users className="h-8 w-8 text-orange-500" />,
      availability: 'Always active',
      action: 'Visit Forum',
      badge: 'Community'
    }
  ];

  const helpResources = [
    {
      title: 'Creator Handbook',
      description: 'Complete guide to becoming a successful streamer',
      icon: <BookOpen className="h-6 w-6" />,
      type: 'Guide',
      readTime: '15 min read'
    },
    {
      title: 'OBS Setup Tutorial',
      description: 'Step-by-step video on configuring OBS for streaming',
      icon: <Video className="h-6 w-6" />,
      type: 'Video',
      readTime: '8 min watch'
    },
    {
      title: 'Monetization Best Practices',
      description: 'Tips and strategies for maximizing your earnings',
      icon: <Zap className="h-6 w-6" />,
      type: 'Article',
      readTime: '10 min read'
    },
    {
      title: 'Community Guidelines',
      description: 'Platform rules and content policies',
      icon: <Shield className="h-6 w-6" />,
      type: 'Policy',
      readTime: '5 min read'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending the support ticket
    toast({
      title: "Support Ticket Created",
      description: "We've received your message and will respond within 24 hours",
    });

    // Reset form
    setContactForm({
      name: '',
      email: '',
      category: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to your questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, FAQs, guides..."
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contact Support
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Help Resources
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            {/* Quick Support Options */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get Quick Help</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportOptions.map((option, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-between items-start mb-4">
                        {option.icon}
                        <Badge variant="secondary">{option.badge}</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                      <p className="text-xs text-muted-foreground mb-4">{option.availability}</p>
                      <Button className="w-full">{option.action}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* FAQ Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} results for "{searchQuery}"
                  </p>
                </div>
              )}

              <div className="space-y-8">
                {filteredFAQs.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {category.icon}
                        {category.title}
                        <Badge variant="outline">{category.questions.length} articles</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFAQs.length === 0 && searchQuery && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try searching with different keywords or contact our support team
                    </p>
                    <Button>Contact Support</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="streaming">Streaming Issues</SelectItem>
                            <SelectItem value="account">Account Support</SelectItem>
                            <SelectItem value="billing">Billing & Payments</SelectItem>
                            <SelectItem value="technical">Technical Problems</SelectItem>
                            <SelectItem value="policy">Policy Questions</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Please provide as much detail as possible about your issue"
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Other ways to reach us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-semibold">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@streamplatform.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Phone className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-semibold">Phone Support</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-semibold">Live Chat</p>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Live Chat</span>
                      <Badge variant="outline">Instant</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Support</span>
                      <Badge variant="outline">Within 24h</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Phone Support</span>
                      <Badge variant="outline">Immediate</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Urgent Issues</span>
                      <Badge variant="outline">Within 2h</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Help Resources Tab */}
          <TabsContent value="resources" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Help Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpResources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {resource.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{resource.title}</h3>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Popular Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Play className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-semibold text-sm">Getting Started</p>
                      <p className="text-xs text-muted-foreground">5:30</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Play className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-semibold text-sm">OBS Setup Guide</p>
                      <p className="text-xs text-muted-foreground">8:15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Play className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-semibold text-sm">Monetization Tips</p>
                      <p className="text-xs text-muted-foreground">12:45</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="status" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">System Status</h2>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="text-xl font-semibold">All Systems Operational</h3>
                      <p className="text-muted-foreground">All services are running normally</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Streaming Service</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Operational</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Chat System</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Operational</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Payment Processing</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Operational</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>User Authentication</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Operational</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Uptime (30 days)</span>
                      <span className="font-semibold">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Response Time</span>
                      <span className="font-semibold">150ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Streams</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Incident</span>
                      <span className="font-semibold">7 days ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;