import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Subtitles, 
  Globe, 
  Volume2, 
  Settings, 
  Download,
  Eye,
  Languages,
  Mic,
  Activity,
  Palette,
  Type
} from "lucide-react";

interface Caption {
  id: string;
  text: string;
  language: string;
  confidence: number;
  timestamp: Date;
  speaker?: string;
}

interface CaptionSettings {
  enabled: boolean;
  languages: string[];
  fontSize: number;
  backgroundColor: string;
  textColor: string;
  position: string;
  opacity: number;
}

const AILiveCaptions = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("");
  const [recentCaptions, setRecentCaptions] = useState<Caption[]>([]);
  
  const [settings, setSettings] = useState<CaptionSettings>({
    enabled: true,
    languages: ["en", "es", "fr"],
    fontSize: 18,
    backgroundColor: "#000000",
    textColor: "#ffffff",
    position: "bottom",
    opacity: 80
  });

  const [stats, setStats] = useState({
    wordsTranscribed: 2847,
    accuracy: 97.3,
    languagesSupported: 25,
    averageLatency: 120
  });

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇧🇷" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" }
  ];

  // Simulate live captions
  useEffect(() => {
    if (!isActive) return;

    const sampleTexts = [
      "Welcome to today's stream everyone!",
      "Thanks for joining us this evening.",
      "Let's start with some exciting gameplay.",
      "Don't forget to follow and subscribe.",
      "The game is getting really intense now.",
      "What do you think about this strategy?",
      "Amazing play right there!",
      "We're approaching the final boss.",
      "Thanks for all the support today."
    ];

    const interval = setInterval(() => {
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      const confidence = 85 + Math.random() * 15;
      
      setCurrentCaption(randomText);
      
      const newCaption: Caption = {
        id: Date.now().toString(),
        text: randomText,
        language: "en",
        confidence,
        timestamp: new Date(),
        speaker: "Streamer"
      };
      
      setRecentCaptions(prev => [newCaption, ...prev.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleLanguage = (langCode: string) => {
    setSettings(prev => ({
      ...prev,
      languages: prev.languages.includes(langCode)
        ? prev.languages.filter(l => l !== langCode)
        : [...prev.languages, langCode]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Live Caption Display */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Subtitles className="h-5 w-5" />
            Live AI Captions
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="captions-toggle">Active</Label>
            <Switch
              id="captions-toggle"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <div className="space-y-4">
              {/* Live Caption Preview */}
              <div 
                className="p-4 rounded-lg text-center min-h-[80px] flex items-center justify-center"
                style={{
                  backgroundColor: settings.backgroundColor + Math.round(settings.opacity * 2.55).toString(16).padStart(2, '0'),
                  color: settings.textColor,
                  fontSize: `${settings.fontSize}px`
                }}
              >
                {currentCaption || "Waiting for speech..."}
              </div>
              
              {/* Active Languages */}
              <div className="flex flex-wrap gap-2">
                {settings.languages.map(langCode => {
                  const lang = languages.find(l => l.code === langCode);
                  return lang ? (
                    <Badge key={langCode} className="flex items-center gap-1">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      <Activity className="h-3 w-3 animate-pulse" />
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <Mic className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Enable live captions to start real-time transcription</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Words Transcribed</p>
                <p className="text-2xl font-bold">{stats.wordsTranscribed.toLocaleString()}</p>
              </div>
              <Type className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">{stats.accuracy}%</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Languages</p>
                <p className="text-2xl font-bold">{stats.languagesSupported}</p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Latency</p>
                <p className="text-2xl font-bold">{stats.averageLatency}ms</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="languages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Language Settings */}
        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Language Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      settings.languages.includes(lang.code)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => toggleLanguage(lang.code)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-muted-foreground">{lang.code.toUpperCase()}</div>
                      </div>
                      {settings.languages.includes(lang.code) && (
                        <div className="ml-auto">
                          <Badge variant="default" className="text-xs">Active</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Pro Tip</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Select multiple languages for automatic detection and translation. 
                  The AI will automatically detect the spoken language and provide captions in all selected languages.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Caption Style
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Font Size</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, fontSize: value[0] }))}
                      max={32}
                      min={12}
                      step={2}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>12px</span>
                      <span>{settings.fontSize}px</span>
                      <span>32px</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Background Color</Label>
                  <div className="flex gap-2 mt-2">
                    {["#000000", "#ffffff", "#1a1a1a", "#f0f0f0"].map((color) => (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded cursor-pointer border-2 ${
                          settings.backgroundColor === color ? "border-primary" : "border-border"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSettings(prev => ({ ...prev, backgroundColor: color }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Text Color</Label>
                  <div className="flex gap-2 mt-2">
                    {["#ffffff", "#000000", "#ffff00", "#00ff00"].map((color) => (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded cursor-pointer border-2 ${
                          settings.textColor === color ? "border-primary" : "border-border"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSettings(prev => ({ ...prev, textColor: color }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Opacity</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.opacity]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, opacity: value[0] }))}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0%</span>
                      <span>{settings.opacity}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Position & Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Caption Position</Label>
                  <Select value={settings.position} onValueChange={(value) => setSettings(prev => ({ ...prev, position: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Label className="text-sm font-medium mb-3 block">Preview</Label>
                  <div 
                    className="p-3 rounded border text-center"
                    style={{
                      backgroundColor: settings.backgroundColor + Math.round(settings.opacity * 2.55).toString(16).padStart(2, '0'),
                      color: settings.textColor,
                      fontSize: `${settings.fontSize}px`
                    }}
                  >
                    Sample caption text
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Caption History */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Caption History</CardTitle>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {recentCaptions.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No captions recorded yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentCaptions.map((caption) => (
                      <div key={caption.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-medium text-sm">{caption.text}</div>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(caption.confidence)}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{caption.speaker}</span>
                          <span>{languages.find(l => l.code === caption.language)?.name}</span>
                          <span>{caption.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AILiveCaptions;