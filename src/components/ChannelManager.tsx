import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Upload, 
  Eye, 
  Save, 
  RefreshCw, 
  ExternalLink,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Twitch,
  Globe,
  Users,
  Calendar,
  Settings,
  Image as ImageIcon,
  X,
  Plus,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ChannelData {
  id?: string;
  name: string;
  display_name: string;
  description: string;
  category: string;
  tags: string[];
  banner_url?: string;
  logo_url?: string;
  social_links: {
    youtube?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    twitch?: string;
    website?: string;
  };
  channel_settings: {
    allow_clips: boolean;
    chat_enabled: boolean;
    mature_content: boolean;
    subscriber_only_chat: boolean;
    notifications_enabled: boolean;
  };
}

const categories = [
  'Gaming', 'Art', 'Music', 'Education', 'Technology', 'Lifestyle', 
  'Entertainment', 'Sports', 'Cooking', 'Fitness', 'Travel', 'Other'
];

interface ChannelManagerProps {
  onChannelUpdate?: (channelName: string) => void;
}

const ChannelManager: React.FC<ChannelManagerProps> = ({ onChannelUpdate }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [channelData, setChannelData] = useState<ChannelData>({
    name: '',
    display_name: '',
    description: '',
    category: '',
    tags: [],
    social_links: {},
    channel_settings: {
      allow_clips: true,
      chat_enabled: true,
      mature_content: false,
      subscriber_only_chat: false,
      notifications_enabled: true
    }
  });
  
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  useEffect(() => {
    fetchChannelData();
  }, [user]);

  const fetchChannelData = async () => {
    if (!user) return;
    
    try {
      const { data: channel, error } = await supabase
        .from('channels')
        .select('*')
        .eq('creator_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching channel:', error);
        return;
      }

      if (channel) {
        setChannelData({
          id: channel.id,
          name: channel.name || '',
          display_name: channel.display_name || '',
          description: channel.description || '',
          category: channel.category || '',
          tags: (channel.tags as string[]) || [],
          banner_url: channel.banner_url,
          logo_url: channel.logo_url,
          social_links: (channel.social_links as any) || {},
          channel_settings: (channel.channel_settings as any) || {
            allow_clips: true,
            chat_enabled: true,
            mature_content: false,
            subscriber_only_chat: false,
            notifications_enabled: true
          }
        });
        onChannelUpdate?.(channel.name); // Notify parent of existing channel
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const channelPayload = {
        creator_id: user.id,
        name: channelData.name,
        display_name: channelData.display_name,
        description: channelData.description,
        category: channelData.category,
        tags: channelData.tags,
        banner_url: channelData.banner_url,
        logo_url: channelData.logo_url,
        social_links: channelData.social_links,
        channel_settings: channelData.channel_settings,
        status: 'active'
      };

      if (channelData.id) {
        const { error } = await supabase
          .from('channels')
          .update(channelPayload)
          .eq('id', channelData.id);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('channels')
          .insert([channelPayload])
          .select()
          .single();
        
        if (error) throw error;
        setChannelData(prev => ({ ...prev, id: data.id }));
        onChannelUpdate?.(channelData.name); // Notify parent
      }

      toast({
        title: "Channel saved",
        description: "Your channel information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving channel:', error);
      toast({
        title: "Error",
        description: "Failed to save channel information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'banner' | 'logo') => {
    if (!user) return;
    
    const setUploading = type === 'banner' ? setBannerUploading : setLogoUploading;
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${type}_${Date.now()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(type === 'banner' ? 'logos' : 'avatar')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(type === 'banner' ? 'logos' : 'avatar')
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;
      
      setChannelData(prev => ({
        ...prev,
        [type === 'banner' ? 'banner_url' : 'logo_url']: imageUrl
      }));

      toast({
        title: "Image uploaded",
        description: `${type === 'banner' ? 'Banner' : 'Logo'} uploaded successfully.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !channelData.tags.includes(newTag.trim()) && channelData.tags.length < 10) {
      setChannelData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setChannelData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const updateSocialLink = (platform: string, url: string) => {
    setChannelData(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: url
      }
    }));
  };

  const updateChannelSetting = (setting: string, value: boolean) => {
    setChannelData(prev => ({
      ...prev,
      channel_settings: {
        ...prev.channel_settings,
        [setting]: value
      }
    }));
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return <Youtube className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'twitch': return <Twitch className="h-4 w-4" />;
      case 'website': return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Channel Management</h2>
          <p className="text-muted-foreground mt-1">
            Customize your public channel appearance and settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          {channelData.name && (
            <Button variant="outline" asChild>
              <a href={`/channel/${channelData.name}`} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Channel
              </a>
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Channel Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="channelName">Channel Name (URL)</Label>
                  <Input
                    id="channelName"
                    value={channelData.name}
                    onChange={(e) => setChannelData(prev => ({ ...prev, name: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                    placeholder="my-awesome-channel"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your channel URL: streamplay.app/channel/{channelData.name || 'your-channel'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={channelData.display_name}
                    onChange={(e) => setChannelData(prev => ({ ...prev, display_name: e.target.value }))}
                    placeholder="My Awesome Channel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={channelData.category}
                    onValueChange={(value) => setChannelData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={channelData.description}
                  onChange={(e) => setChannelData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell viewers about your channel..."
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {channelData.description.length}/500 characters
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tags Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {channelData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} disabled={channelData.tags.length >= 10}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                {channelData.tags.length}/10 tags. Tags help viewers discover your content.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Banner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden relative">
                  {channelData.banner_url ? (
                    <img 
                      src={channelData.banner_url} 
                      alt="Channel banner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No banner uploaded</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'banner');
                        }}
                      />
                      <Button disabled={bannerUploading}>
                        {bannerUploading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </Button>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended: 1920x1080px, Max 5MB
                </p>
              </CardContent>
            </Card>

            {/* Logo Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-32 h-32 mx-auto relative">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={channelData.logo_url} />
                    <AvatarFallback className="text-2xl">
                      {channelData.display_name?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'logo');
                        }}
                      />
                      <Button size="sm" disabled={logoUploading}>
                        {logoUploading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </Button>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Square format recommended, Max 2MB
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['youtube', 'twitter', 'instagram', 'facebook', 'twitch', 'website'].map(platform => (
                <div key={platform} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-24">
                    {getSocialIcon(platform)}
                    <span className="capitalize text-sm">{platform}</span>
                  </div>
                  <Input
                    value={channelData.social_links[platform as keyof typeof channelData.social_links] || ''}
                    onChange={(e) => updateSocialLink(platform, e.target.value)}
                    placeholder={`https://${platform === 'website' ? 'your-website.com' : `${platform}.com/your-profile`}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries({
                allow_clips: 'Allow viewers to create clips',
                chat_enabled: 'Enable chat for streams',
                mature_content: 'Mature content warning',
                subscriber_only_chat: 'Subscriber-only chat',
                notifications_enabled: 'Send notifications to followers'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">{label}</Label>
                    <p className="text-xs text-muted-foreground">
                      {key === 'mature_content' && 'Mark your content as mature if it contains adult themes'}
                      {key === 'subscriber_only_chat' && 'Only subscribers can chat in your streams'}
                      {key === 'notifications_enabled' && 'Notify followers when you go live'}
                      {key === 'allow_clips' && 'Let viewers create and share clips from your streams'}
                      {key === 'chat_enabled' && 'Enable or disable chat functionality'}
                    </p>
                  </div>
                  <Switch
                    checked={channelData.channel_settings[key as keyof typeof channelData.channel_settings]}
                    onCheckedChange={(checked) => updateChannelSetting(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChannelManager;