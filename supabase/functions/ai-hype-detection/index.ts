import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HypeDetectionRequest {
  videoData?: ArrayBuffer;
  audioData?: ArrayBuffer;
  chatActivity: {
    messageCount: number;
    sentiment: number;
    keywords: string[];
    timeWindow: number;
  };
  viewerMetrics: {
    currentViewers: number;
    viewerGrowth: number;
    engagement: number;
  };
}

interface HypeDetectionResponse {
  detectedMoments: Array<{
    timestamp: number;
    type: 'chat_spike' | 'audio_sentiment' | 'viewer_surge' | 'visual_motion';
    intensity: number;
    confidence: number;
    description: string;
    suggestedClip: {
      startTime: number;
      endTime: number;
      title: string;
      hashtags: string[];
      description: string;
    };
  }>;
}

// Mock AI detection logic (in real implementation, this would use ML models)
function detectHypeMoments(data: HypeDetectionRequest): HypeDetectionResponse {
  const moments = [];
  
  // Chat activity analysis
  if (data.chatActivity.messageCount > 50 && data.chatActivity.sentiment > 0.7) {
    moments.push({
      timestamp: Date.now(),
      type: 'chat_spike' as const,
      intensity: Math.min(100, data.chatActivity.messageCount * 2),
      confidence: data.chatActivity.sentiment * 100,
      description: `High chat activity with ${data.chatActivity.messageCount} messages`,
      suggestedClip: {
        startTime: Date.now() - 30000,
        endTime: Date.now() + 30000,
        title: generateClipTitle(data.chatActivity.keywords),
        hashtags: generateHashtags(data.chatActivity.keywords),
        description: generateDescription('chat_spike', data.chatActivity.keywords)
      }
    });
  }

  // Viewer surge detection
  if (data.viewerMetrics.viewerGrowth > 20) {
    moments.push({
      timestamp: Date.now(),
      type: 'viewer_surge' as const,
      intensity: Math.min(100, data.viewerMetrics.viewerGrowth * 3),
      confidence: 85,
      description: `Viewer surge: +${data.viewerMetrics.viewerGrowth}% increase`,
      suggestedClip: {
        startTime: Date.now() - 45000,
        endTime: Date.now() + 15000,
        title: "🔥 Moment That Brought The Crowd!",
        hashtags: ["#Viral", "#Trending", "#Hype", "#StreamHighlight"],
        description: "This moment caused a massive viewer surge! Don't miss the reaction 🚀"
      }
    });
  }

  return { detectedMoments: moments };
}

function generateClipTitle(keywords: string[]): string {
  const templates = [
    "🔥 {keyword} Moment Goes VIRAL!",
    "INSANE {keyword} - Chat Loses It! 😱",
    "This {keyword} Had Everyone Screaming! 🚀",
    "EPIC {keyword} - You Won't Believe This! ⚡"
  ];
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  const keyword = keywords[0] || "Gaming";
  return template.replace("{keyword}", keyword.charAt(0).toUpperCase() + keyword.slice(1));
}

function generateHashtags(keywords: string[]): string[] {
  const baseHashtags = ["#Viral", "#Trending", "#Gaming", "#StreamHighlight"];
  const keywordHashtags = keywords.map(k => `#${k.charAt(0).toUpperCase() + k.slice(1)}`);
  return [...baseHashtags, ...keywordHashtags.slice(0, 3)];
}

function generateDescription(type: string, keywords: string[]): string {
  const descriptions = {
    chat_spike: "The chat went absolutely crazy during this moment! The reactions were priceless 😂",
    audio_sentiment: "Listen to that excitement! This moment had everyone hyped 🔥",
    viewer_surge: "This moment brought so many new viewers - it's pure magic ✨",
    visual_motion: "The action was so intense, you can feel the energy through the screen ⚡"
  };
  
  return descriptions[type as keyof typeof descriptions] || "An amazing highlight moment!";
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: HypeDetectionRequest = await req.json();
    
    console.log('Processing hype detection request:', {
      chatMessages: requestData.chatActivity.messageCount,
      viewerGrowth: requestData.viewerMetrics.viewerGrowth,
      sentiment: requestData.chatActivity.sentiment
    });

    // Detect hype moments using AI analysis
    const detectionResult = detectHypeMoments(requestData);
    
    console.log('Detected moments:', detectionResult.detectedMoments.length);

    return new Response(JSON.stringify(detectionResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in hype detection:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process hype detection', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});