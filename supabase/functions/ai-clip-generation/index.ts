import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ClipGenerationRequest {
  videoUrl: string;
  startTime: number;
  endTime: number;
  format: 'vertical' | 'horizontal' | 'square';
  platform: string[];
  title: string;
  description: string;
  hashtags: string[];
}

interface ClipGenerationResponse {
  clipId: string;
  status: 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  thumbnail?: string;
  optimizedVersions?: Array<{
    platform: string;
    format: string;
    url: string;
    duration: number;
  }>;
}

// Mock video processing (in real implementation, this would use FFmpeg)
async function generateClip(request: ClipGenerationRequest): Promise<ClipGenerationResponse> {
  const clipId = `clip_${Date.now()}`;
  
  console.log(`Generating clip: ${clipId}`, {
    duration: request.endTime - request.startTime,
    format: request.format,
    platforms: request.platform
  });

  // Simulate video processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock generated URLs (in real implementation, these would be actual processed video files)
  const baseUrl = "https://example.com/clips";
  const optimizedVersions = request.platform.map(platform => ({
    platform,
    format: request.format,
    url: `${baseUrl}/${clipId}_${platform.toLowerCase().replace(' ', '_')}.mp4`,
    duration: request.endTime - request.startTime
  }));

  return {
    clipId,
    status: 'completed',
    downloadUrl: `${baseUrl}/${clipId}_master.mp4`,
    thumbnail: `${baseUrl}/${clipId}_thumb.jpg`,
    optimizedVersions
  };
}

// Generate optimized titles and descriptions using AI
async function optimizeContent(originalTitle: string, originalDescription: string, platform: string): Promise<{title: string, description: string, hashtags: string[]}> {
  // In a real implementation, this would call OpenAI GPT for optimization
  const platformOptimizations = {
    'TikTok': {
      titlePrefix: '🔥',
      maxTitleLength: 100,
      hashtagCount: 5,
      style: 'energetic'
    },
    'Instagram Reels': {
      titlePrefix: '✨',
      maxTitleLength: 125,
      hashtagCount: 8,
      style: 'aesthetic'
    },
    'YouTube Shorts': {
      titlePrefix: '🚀',
      maxTitleLength: 100,
      hashtagCount: 3,
      style: 'searchable'
    }
  };

  const config = platformOptimizations[platform as keyof typeof platformOptimizations] || platformOptimizations['TikTok'];
  
  const optimizedTitle = `${config.titlePrefix} ${originalTitle}`.slice(0, config.maxTitleLength);
  const optimizedDescription = originalDescription + ` Perfect for ${platform}! 🎯`;
  
  const hashtags = [
    '#Viral', '#Gaming', '#Highlight', '#MustWatch', '#Trending',
    '#StreamMoments', '#EpicFail', '#Clutch', '#GamerLife', '#ContentCreator'
  ].slice(0, config.hashtagCount);

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    hashtags
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clipRequest: ClipGenerationRequest = await req.json();
    
    console.log('Processing clip generation request:', {
      title: clipRequest.title,
      duration: clipRequest.endTime - clipRequest.startTime,
      platforms: clipRequest.platform
    });

    // Generate the base clip
    const clipResult = await generateClip(clipRequest);
    
    // Optimize content for each platform
    const optimizedContent = await Promise.all(
      clipRequest.platform.map(async (platform) => {
        const optimized = await optimizeContent(
          clipRequest.title, 
          clipRequest.description, 
          platform
        );
        return { platform, ...optimized };
      })
    );

    const response = {
      ...clipResult,
      optimizedContent,
      metadata: {
        originalTitle: clipRequest.title,
        originalDescription: clipRequest.description,
        originalHashtags: clipRequest.hashtags,
        processingTime: '2.3s',
        fileSize: '15.2MB'
      }
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in clip generation:', error);
    return new Response(
      JSON.stringify({ 
        clipId: `error_${Date.now()}`,
        status: 'failed',
        error: 'Failed to generate clip', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});