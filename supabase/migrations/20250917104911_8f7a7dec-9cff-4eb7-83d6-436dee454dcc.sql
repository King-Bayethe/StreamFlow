-- Create comprehensive mock streams data using existing profiles
INSERT INTO streams (creator_id, title, description, status, viewer_count, max_viewers, started_at, ended_at, total_revenue_cents, thumbnail_url, is_recording) VALUES

-- LIVE STREAMS (currently active)
((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Epic Dark Souls III Boss Rush - Soul of Cinder Awaits!', 'The ultimate dark souls challenge! Fighting every boss leading to the final encounter.', 'live', 15420, 18950, NOW() - INTERVAL '2 hours', NULL, 24750, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop', true),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Speedrun Marathon - Multiple Games Back to Back!', 'Going for personal bests in Mario Odyssey, Celeste, and Hollow Knight!', 'live', 8930, 12400, NOW() - INTERVAL '1 hour 30 minutes', NULL, 15680, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', true),

-- More live streams with different viewer counts and themes
((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Elden Ring Challenge Run - No Leveling, Boss Weapons Only', 'The most insane challenge run you have ever seen. Pure skill required!', 'live', 23100, 28500, NOW() - INTERVAL '3 hours', NULL, 41250, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop', true),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Indie Game Discovery - Hidden Gems Showcase', 'Exploring amazing indie games that deserve more attention!', 'live', 4320, 5890, NOW() - INTERVAL '45 minutes', NULL, 8900, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Minecraft Hardcore World - 100 Days Challenge', 'Can I survive 100 days in hardcore mode? Day 73 and counting!', 'live', 12750, 16200, NOW() - INTERVAL '2 hours 15 minutes', NULL, 19870, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', true),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Retro Gaming Night - Classic Arcade Games', 'Taking a trip down memory lane with classic arcade favorites!', 'live', 6840, 8420, NOW() - INTERVAL '1 hour', NULL, 12340, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop', false),

-- OFFLINE STREAMS (recently ended)
((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Valorant Ranked Grind - Climbing to Radiant', 'Intense competitive gameplay with strategy breakdowns', 'offline', 0, 19340, NOW() - INTERVAL '1 day', NOW() - INTERVAL '22 hours', 31200, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Super Metroid 100% Speedrun Attempts', 'Going for sub-1 hour completion with 100% items collected', 'offline', 0, 12890, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day 20 hours', 23450, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Cyberpunk 2077 Phantom Liberty Playthrough', 'Exploring the new expansion with full immersion setup', 'offline', 0, 16780, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days 21 hours', 28940, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Celeste Golden Strawberries Challenge', 'The hardest platforming challenge in gaming - going for all goldens!', 'offline', 0, 8970, NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days 22 hours', 15430, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Horror Game Marathon - Resident Evil 4 Remake', 'Survival horror at its finest. Can we survive the night?', 'offline', 0, 21450, NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days 23 hours', 37890, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Hollow Knight Steel Soul Mode', 'Permadeath run in one of the hardest metroidvanias ever made', 'offline', 0, 7650, NOW() - INTERVAL '6 days', NOW() - INTERVAL '5 days 21 hours', 12890, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Fortnite Creative Mode - Building Masterpieces', 'Showcasing incredible creative builds and teaching techniques', 'offline', 0, 11230, NOW() - INTERVAL '1 week', NOW() - INTERVAL '6 days 22 hours', 18670, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Ori and the Will of the Wisps Emotional Journey', 'One of the most beautiful games ever made - prepare for tears', 'offline', 0, 9560, NOW() - INTERVAL '1 week 1 day', NOW() - INTERVAL '1 week 23 hours', 16780, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', false),

-- SCHEDULED STREAMS (future)
((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Weekend Warriors - Dark Souls II Scholar Edition', 'Continuing the souls journey with the second installment', 'scheduled', 0, 0, NOW() + INTERVAL '2 days', NULL, 0, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'Luxor6666'), 'Community Choice Stream - You Pick the Game!', 'Interactive stream where chat decides what we play next', 'scheduled', 0, 0, NOW() + INTERVAL '3 days', NULL, 0, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', false),

((SELECT user_id FROM profiles WHERE username = 'LordMalachai'), 'Charity Stream Special - 24 Hour Gaming Marathon', 'Supporting local gaming charity with epic 24-hour challenge', 'scheduled', 0, 0, NOW() + INTERVAL '1 week', NULL, 0, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop', false);