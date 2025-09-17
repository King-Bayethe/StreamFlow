import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Save, 
  Shield, 
  DollarSign, 
  Users, 
  MessageSquare,
  Play,
  Mail,
  Globe
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PlatformSetting {
  setting_key: string;
  setting_value: any;
  description?: string;
}

export const PlatformSettings = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*');

      if (error) throw error;

      const settingsMap: Record<string, any> = {};
      data?.forEach((setting: PlatformSetting) => {
        settingsMap[setting.setting_key] = setting.setting_value;
      });

      // Set defaults if settings don't exist
      const defaultSettings = {
        site_name: 'StreamFlow',
        site_description: 'The ultimate live streaming platform',
        registration_enabled: true,
        email_verification_required: true,
        creator_approval_required: false,
        min_super_chat_amount: 1,
        max_super_chat_amount: 500,
        platform_fee_percentage: 15,
        stream_quality_enforcement: true,
        content_moderation_enabled: true,
        auto_moderation_enabled: false,
        chat_rate_limit: 5,
        max_stream_duration_hours: 12,
        maintenance_mode: false,
        announcement_text: '',
        support_email: 'support@streamflow.com',
        terms_url: '/terms',
        privacy_url: '/privacy'
      };

      setSettings({ ...defaultSettings, ...settingsMap });
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch platform settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('platform_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Save all settings
      const promises = Object.entries(settings).map(([key, value]) =>
        updateSetting(key, value)
      );

      await Promise.all(promises);

      toast({
        title: "Success",
        description: "Platform settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to save platform settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-pulse">Loading platform settings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Platform Settings</h2>
          <p className="text-muted-foreground">Configure your streaming platform</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic platform configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name || ''}
                  onChange={(e) => handleInputChange('site_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support_email">Support Email</Label>
                <Input
                  id="support_email"
                  type="email"
                  value={settings.support_email || ''}
                  onChange={(e) => handleInputChange('support_email', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                value={settings.site_description || ''}
                onChange={(e) => handleInputChange('site_description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcement_text">Platform Announcement</Label>
              <Textarea
                id="announcement_text"
                placeholder="Optional announcement shown to all users"
                value={settings.announcement_text || ''}
                onChange={(e) => handleInputChange('announcement_text', e.target.value)}
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="maintenance_mode"
                checked={settings.maintenance_mode || false}
                onCheckedChange={(checked) => handleInputChange('maintenance_mode', checked)}
              />
              <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Control user registration and verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="registration_enabled"
                checked={settings.registration_enabled || false}
                onCheckedChange={(checked) => handleInputChange('registration_enabled', checked)}
              />
              <Label htmlFor="registration_enabled">Enable User Registration</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="email_verification_required"
                checked={settings.email_verification_required || false}
                onCheckedChange={(checked) => handleInputChange('email_verification_required', checked)}
              />
              <Label htmlFor="email_verification_required">Require Email Verification</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="creator_approval_required"
                checked={settings.creator_approval_required || false}
                onCheckedChange={(checked) => handleInputChange('creator_approval_required', checked)}
              />
              <Label htmlFor="creator_approval_required">Require Creator Approval</Label>
            </div>
          </CardContent>
        </Card>

        {/* Streaming Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Streaming Settings
            </CardTitle>
            <CardDescription>
              Configure streaming parameters and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_stream_duration_hours">Max Stream Duration (hours)</Label>
                <Input
                  id="max_stream_duration_hours"
                  type="number"
                  min="1"
                  max="24"
                  value={settings.max_stream_duration_hours || 12}
                  onChange={(e) => handleInputChange('max_stream_duration_hours', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chat_rate_limit">Chat Rate Limit (messages/minute)</Label>
                <Input
                  id="chat_rate_limit"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.chat_rate_limit || 5}
                  onChange={(e) => handleInputChange('chat_rate_limit', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="stream_quality_enforcement"
                checked={settings.stream_quality_enforcement || false}
                onCheckedChange={(checked) => handleInputChange('stream_quality_enforcement', checked)}
              />
              <Label htmlFor="stream_quality_enforcement">Enforce Stream Quality Standards</Label>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>
              Configure Super Chat and revenue sharing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_super_chat_amount">Min Super Chat ($)</Label>
                <Input
                  id="min_super_chat_amount"
                  type="number"
                  min="1"
                  value={settings.min_super_chat_amount || 1}
                  onChange={(e) => handleInputChange('min_super_chat_amount', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_super_chat_amount">Max Super Chat ($)</Label>
                <Input
                  id="max_super_chat_amount"
                  type="number"
                  min="1"
                  value={settings.max_super_chat_amount || 500}
                  onChange={(e) => handleInputChange('max_super_chat_amount', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform_fee_percentage">Platform Fee (%)</Label>
                <Input
                  id="platform_fee_percentage"
                  type="number"
                  min="0"
                  max="50"
                  value={settings.platform_fee_percentage || 15}
                  onChange={(e) => handleInputChange('platform_fee_percentage', parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moderation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Content Moderation
            </CardTitle>
            <CardDescription>
              Configure content moderation and safety features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="content_moderation_enabled"
                checked={settings.content_moderation_enabled || false}
                onCheckedChange={(checked) => handleInputChange('content_moderation_enabled', checked)}
              />
              <Label htmlFor="content_moderation_enabled">Enable Content Moderation</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="auto_moderation_enabled"
                checked={settings.auto_moderation_enabled || false}
                onCheckedChange={(checked) => handleInputChange('auto_moderation_enabled', checked)}
              />
              <Label htmlFor="auto_moderation_enabled">Enable Auto-Moderation (AI)</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};