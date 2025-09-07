import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SocialPublishRequest {
  clipId: string;
  platforms: Array<{
    name: string;
    accessToken?: string;
    title: string;
    description: string;
    hashtags: string[];
    scheduledTime?: string;
  }>;
  videoUrl: string;
  thumbnailUrl: string;
}

interface SocialPublishResponse {
  results: Array<{
    platform: string;
    status: 'success' | 'failed' | 'scheduled';
    postId?: string;
    postUrl?: string;
    error?: string;
    scheduledFor?: string;
  }>;
}

// Mock social media publishing
async function publishToTikTok(content: any): Promise<{status: string, postId?: string, postUrl?: string, error?: string}> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock success/failure
  if (Math.random() > 0.1) {
    const postId = `tiktok_${Date.now()}`;
    return {
      status: 'success',
      postId,
      postUrl: `https://tiktok.com/@user/video/${postId}`
    };
  } else {
    return {
      status: 'failed',
      error: 'TikTok API rate limit exceeded'
    };
  }
}

async function publishToInstagram(content: any): Promise<{status: string, postId?: string, postUrl?: string, error?: string}> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (Math.random() > 0.05) {
    const postId = `ig_${Date.now()}`;
    return {
      status: 'success',
      postId,
      postUrl: `https://instagram.com/p/${postId}`
    };
  } else {
    return {
      status: 'failed',
      error: 'Instagram content does not meet community guidelines'
    };
  }
}

async function publishToYouTubeShorts(content: any): Promise<{status: string, postId?: string, postUrl?: string, error?: string}> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (Math.random() > 0.15) {
    const videoId = `yt_short_${Date.now()}`;
    return {
      status: 'success',
      postId: videoId,
      postUrl: `https://youtube.com/shorts/${videoId}`
    };
  } else {
    return {
      status: 'failed',
      error: 'YouTube processing failed - video too short'
    };
  }
}

async function publishToTwitter(content: any): Promise<{status: string, postId?: string, postUrl?: string, error?: string}> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (Math.random() > 0.08) {
    const tweetId = `tweet_${Date.now()}`;
    return {
      status: 'success',
      postId: tweetId,
      postUrl: `https://twitter.com/user/status/${tweetId}`
    };
  } else {
    return {
      status: 'failed',
      error: 'Twitter video upload failed'
    };
  }
}

async function schedulePost(platform: string, content: any, scheduledTime: string): Promise<{status: string, scheduledFor: string}> {
  // In a real implementation, this would store the post in a job queue
  console.log(`Scheduling post for ${platform} at ${scheduledTime}`);
  
  return {
    status: 'scheduled',
    scheduledFor: scheduledTime
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const publishRequest: SocialPublishRequest = await req.json();
    
    console.log('Processing social media publish request:', {
      clipId: publishRequest.clipId,
      platforms: publishRequest.platforms.map(p => p.name)
    });

    const results = await Promise.all(
      publishRequest.platforms.map(async (platform) => {
        const content = {
          title: platform.title,
          description: platform.description,
          hashtags: platform.hashtags,
          videoUrl: publishRequest.videoUrl,
          thumbnailUrl: publishRequest.thumbnailUrl
        };

        // If scheduled, handle scheduling
        if (platform.scheduledTime) {
          const scheduleResult = await schedulePost(platform.name, content, platform.scheduledTime);
          return {
            platform: platform.name,
            ...scheduleResult
          };
        }

        // Immediate publishing
        let publishResult;
        switch (platform.name.toLowerCase()) {
          case 'tiktok':
            publishResult = await publishToTikTok(content);
            break;
          case 'instagram':
          case 'instagram reels':
            publishResult = await publishToInstagram(content);
            break;
          case 'youtube':
          case 'youtube shorts':
            publishResult = await publishToYouTubeShorts(content);
            break;
          case 'twitter':
            publishResult = await publishToTwitter(content);
            break;
          default:
            publishResult = {
              status: 'failed',
              error: `Platform ${platform.name} not supported`
            };
        }

        return {
          platform: platform.name,
          ...publishResult
        };
      })
    );

    const response: SocialPublishResponse = { results };
    
    console.log('Social publish results:', results);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in social media publishing:', error);
    return new Response(
      JSON.stringify({ 
        results: [{
          platform: 'error',
          status: 'failed',
          error: 'Failed to process publish request: ' + error.message
        }]
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});