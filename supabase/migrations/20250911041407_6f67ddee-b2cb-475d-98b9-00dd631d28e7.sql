-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  is_creator BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create streams table for live streaming sessions
CREATE TABLE public.streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('draft', 'live', 'ended')) DEFAULT 'draft',
  viewer_count INTEGER DEFAULT 0,
  total_revenue_cents INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Create chat_messages table for superchat functionality
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  username TEXT NOT NULL,
  content TEXT NOT NULL,
  is_paid BOOLEAN DEFAULT false,
  amount_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  pinned_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table for transaction tracking
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID REFERENCES public.streams(id) ON DELETE SET NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  type TEXT CHECK (type IN ('superchat', 'poll_vote', 'tip')) DEFAULT 'superchat',
  status TEXT CHECK (status IN ('succeeded', 'pending', 'failed')) DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  message_id UUID REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create polls table for creator polls
CREATE TABLE public.polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of poll options
  min_payment_cents INTEGER DEFAULT 100, -- Minimum $1 to vote
  total_votes INTEGER DEFAULT 0,
  total_revenue_cents INTEGER DEFAULT 0,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create poll_votes table for paid voting
CREATE TABLE public.poll_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  option_index INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(poll_id, user_id) -- One vote per user per poll
);

-- Create announcements table for creator announcements
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('announcement', 'alert', 'promo')) DEFAULT 'announcement',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for streams
CREATE POLICY "Streams are viewable by everyone" ON public.streams FOR SELECT USING (true);
CREATE POLICY "Creators can manage their streams" ON public.streams FOR ALL USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = creator_id));

-- RLS Policies for chat_messages
CREATE POLICY "Chat messages are viewable by everyone" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = sender_id));
CREATE POLICY "Creators can view payments to them" ON public.payments FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = creator_id));
CREATE POLICY "System can insert payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update payments" ON public.payments FOR UPDATE USING (true);

-- RLS Policies for polls
CREATE POLICY "Polls are viewable by everyone" ON public.polls FOR SELECT USING (true);
CREATE POLICY "Creators can manage their polls" ON public.polls FOR ALL USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = creator_id));

-- RLS Policies for poll_votes
CREATE POLICY "Poll votes are viewable by everyone" ON public.poll_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON public.poll_votes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for announcements
CREATE POLICY "Announcements are viewable by everyone" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Creators can manage their announcements" ON public.announcements FOR ALL USING (auth.uid() = (SELECT user_id FROM public.profiles WHERE id = creator_id));

-- Create indexes for performance
CREATE INDEX idx_chat_messages_stream_created ON public.chat_messages(stream_id, created_at DESC);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_poll_votes_poll_id ON public.poll_votes(poll_id);
CREATE INDEX idx_streams_status ON public.streams(status);

-- Create function to calculate pin duration based on payment amount
CREATE OR REPLACE FUNCTION calculate_pin_duration(amount_cents INTEGER)
RETURNS INTERVAL AS $$
BEGIN
  CASE
    WHEN amount_cents >= 1000 THEN RETURN interval '5 minutes';  -- $10+
    WHEN amount_cents >= 500 THEN RETURN interval '2 minutes';   -- $5+
    WHEN amount_cents >= 100 THEN RETURN interval '30 seconds';  -- $1+
    ELSE RETURN interval '0 seconds';
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Create function to handle new user setup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user setup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();