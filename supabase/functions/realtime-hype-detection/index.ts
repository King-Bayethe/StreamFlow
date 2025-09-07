import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const { headers } = req => {
  const upgradeHeader = headers.get("upgrade") || "";
  
  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  
  // Store connected clients for real-time detection
  const connectedClients = new Set();
  connectedClients.add(socket);

  // Mock real-time hype detection data
  let detectionInterval: number;

  socket.onopen = () => {
    console.log("Client connected to real-time hype detection");
    
    // Start sending real-time detection updates
    detectionInterval = setInterval(() => {
      const mockDetection = {
        type: 'hype_detection',
        timestamp: Date.now(),
        data: {
          chatActivity: {
            messagesPerSecond: Math.floor(Math.random() * 20) + 5,
            sentiment: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
            topEmotes: ['PogChamp', 'KEKW', 'EZ'],
            keywords: ['epic', 'fail', 'clutch', 'insane']
          },
          audioMetrics: {
            volume: Math.random() * 40 + 60, // 60-100
            excitement: Math.random() * 0.3 + 0.7, // 0.7-1.0
            voiceActivity: Math.random() > 0.3
          },
          visualMetrics: {
            motionIntensity: Math.random() * 50 + 30, // 30-80
            sceneChanges: Math.floor(Math.random() * 5),
            colorVariance: Math.random() * 0.4 + 0.3
          },
          viewerMetrics: {
            currentViewers: Math.floor(Math.random() * 500) + 1000,
            viewerGrowth: Math.random() * 30 - 5, // -5 to +25
            engagement: Math.random() * 20 + 10 // 10-30%
          }
        }
      };

      // Check if this qualifies as a hype moment
      const isHypeMoment = 
        mockDetection.data.chatActivity.messagesPerSecond > 15 ||
        mockDetection.data.audioMetrics.excitement > 0.85 ||
        mockDetection.data.viewerMetrics.viewerGrowth > 15;

      if (isHypeMoment) {
        const hypeEvent = {
          type: 'hype_moment_detected',
          timestamp: mockDetection.timestamp,
          intensity: Math.floor(Math.random() * 30) + 70,
          confidence: Math.floor(Math.random() * 20) + 80,
          triggers: {
            chat: mockDetection.data.chatActivity.messagesPerSecond > 15,
            audio: mockDetection.data.audioMetrics.excitement > 0.85,
            viewers: mockDetection.data.viewerMetrics.viewerGrowth > 15
          },
          suggestedClip: {
            startTime: mockDetection.timestamp - 30000,
            endTime: mockDetection.timestamp + 30000,
            title: generateViralTitle(),
            hashtags: ['#Viral', '#Gaming', '#Epic', '#Highlight'],
            description: "This moment had everyone going crazy! 🔥"
          }
        };
        
        socket.send(JSON.stringify(hypeEvent));
      }

      socket.send(JSON.stringify(mockDetection));
    }, 2000);
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      
      if (message.type === 'start_detection') {
        console.log('Starting real-time hype detection');
        // Detection is already running via interval
      } else if (message.type === 'stop_detection') {
        console.log('Stopping real-time hype detection');
        if (detectionInterval) {
          clearInterval(detectionInterval);
        }
      } else if (message.type === 'clip_request') {
        // Handle manual clip generation request
        const clipResponse = {
          type: 'clip_generation_started',
          clipId: `manual_${Date.now()}`,
          estimatedTime: '30s'
        };
        socket.send(JSON.stringify(clipResponse));
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  };

  socket.onclose = () => {
    console.log("Client disconnected from real-time hype detection");
    connectedClients.delete(socket);
    if (detectionInterval) {
      clearInterval(detectionInterval);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return response;
};

function generateViralTitle(): string {
  const templates = [
    "🔥 EPIC Moment - Chat Goes WILD!",
    "😱 INSANE Play - Everyone Lost It!",
    "🚀 CLUTCH Move - Pure Hype!",
    "⚡ VIRAL Moment - You Won't Believe This!",
    "🎯 PERFECT Shot - Crowd Goes Crazy!",
    "💥 EXPLOSIVE Reaction - Must See!",
    "🏆 LEGENDARY Move - Pure Gold!",
    "🎪 CIRCUS Play - Absolutely Bonkers!"
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

serve(handleRequest);