export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string | null
          creator_id: string | null
          id: string
          stream_id: string | null
          title: string
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          creator_id?: string | null
          id?: string
          stream_id?: string | null
          title: string
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          creator_id?: string | null
          id?: string
          stream_id?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      business_profiles: {
        Row: {
          branding_preferences: Json | null
          business_email: string
          business_type: string | null
          created_at: string | null
          custom_slug: string | null
          facebook: string | null
          id: string
          industry: string | null
          instagram: string | null
          is_complete: boolean
          linkedin: string | null
          location: string | null
          logo_url: string | null
          name: string
          phone_number: string
          tiktok: string | null
          twitter: string | null
          user_id: string | null
          website: string | null
          youtube: string | null
        }
        Insert: {
          branding_preferences?: Json | null
          business_email: string
          business_type?: string | null
          created_at?: string | null
          custom_slug?: string | null
          facebook?: string | null
          id?: string
          industry?: string | null
          instagram?: string | null
          is_complete?: boolean
          linkedin?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          phone_number: string
          tiktok?: string | null
          twitter?: string | null
          user_id?: string | null
          website?: string | null
          youtube?: string | null
        }
        Update: {
          branding_preferences?: Json | null
          business_email?: string
          business_type?: string | null
          created_at?: string | null
          custom_slug?: string | null
          facebook?: string | null
          id?: string
          industry?: string | null
          instagram?: string | null
          is_complete?: boolean
          linkedin?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          phone_number?: string
          tiktok?: string | null
          twitter?: string | null
          user_id?: string | null
          website?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          amount_cents: number | null
          content: string
          created_at: string | null
          currency: string | null
          id: string
          is_paid: boolean | null
          pinned_until: string | null
          stream_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          amount_cents?: number | null
          content: string
          created_at?: string | null
          currency?: string | null
          id?: string
          is_paid?: boolean | null
          pinned_until?: string | null
          stream_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          amount_cents?: number | null
          content?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          is_paid?: boolean | null
          pinned_until?: string | null
          stream_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      embed_settings: {
        Row: {
          card_bg_color: string
          color: string | null
          created_at: string | null
          design_type: string
          font: string | null
          font_color: string
          font_family: string
          form_id: string | null
          id: string
          show_avg_rating: boolean | null
          summary: string
          theme: string | null
          title: string
          widget_bg_color: string
          widget_type: string | null
          write_review_text: string
        }
        Insert: {
          card_bg_color?: string
          color?: string | null
          created_at?: string | null
          design_type?: string
          font?: string | null
          font_color?: string
          font_family?: string
          form_id?: string | null
          id?: string
          show_avg_rating?: boolean | null
          summary?: string
          theme?: string | null
          title?: string
          widget_bg_color?: string
          widget_type?: string | null
          write_review_text?: string
        }
        Update: {
          card_bg_color?: string
          color?: string | null
          created_at?: string | null
          design_type?: string
          font?: string | null
          font_color?: string
          font_family?: string
          form_id?: string | null
          id?: string
          show_avg_rating?: boolean | null
          summary?: string
          theme?: string | null
          title?: string
          widget_bg_color?: string
          widget_type?: string | null
          write_review_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "embed_settings_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "review_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_fields: {
        Row: {
          created_at: string | null
          form_id: string | null
          id: string
          is_required: boolean | null
          label: string | null
          options: Json | null
          order: number | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          form_id?: string | null
          id?: string
          is_required?: boolean | null
          label?: string | null
          options?: Json | null
          order?: number | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          form_id?: string | null
          id?: string
          is_required?: boolean | null
          label?: string | null
          options?: Json | null
          order?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "review_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_settings: {
        Row: {
          allow_anonymous: boolean | null
          created_at: string | null
          form_id: string | null
          id: string
          redirect_url: string | null
          require_name_email: boolean | null
          thank_you_message: string | null
        }
        Insert: {
          allow_anonymous?: boolean | null
          created_at?: string | null
          form_id?: string | null
          id?: string
          redirect_url?: string | null
          require_name_email?: boolean | null
          thank_you_message?: string | null
        }
        Update: {
          allow_anonymous?: boolean | null
          created_at?: string | null
          form_id?: string | null
          id?: string
          redirect_url?: string | null
          require_name_email?: boolean | null
          thank_you_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_settings_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: true
            referencedRelation: "review_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string | null
          id: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          created_at: string | null
          creator_id: string | null
          currency: string | null
          id: string
          message_id: string | null
          sender_id: string | null
          status: string | null
          stream_id: string | null
          stripe_payment_intent_id: string | null
          type: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          creator_id?: string | null
          currency?: string | null
          id?: string
          message_id?: string | null
          sender_id?: string | null
          status?: string | null
          stream_id?: string | null
          stripe_payment_intent_id?: string | null
          type?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          creator_id?: string | null
          currency?: string | null
          id?: string
          message_id?: string | null
          sender_id?: string | null
          status?: string | null
          stream_id?: string | null
          stripe_payment_intent_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_votes: {
        Row: {
          amount_cents: number
          created_at: string | null
          id: string
          option_index: number
          payment_id: string | null
          poll_id: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          id?: string
          option_index: number
          payment_id?: string | null
          poll_id?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          id?: string
          option_index?: number
          payment_id?: string | null
          poll_id?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string | null
          creator_id: string | null
          ends_at: string | null
          id: string
          min_payment_cents: number | null
          options: Json
          question: string
          stream_id: string | null
          total_revenue_cents: number | null
          total_votes: number | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          ends_at?: string | null
          id?: string
          min_payment_cents?: number | null
          options: Json
          question: string
          stream_id?: string | null
          total_revenue_cents?: number | null
          total_votes?: number | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          ends_at?: string | null
          id?: string
          min_payment_cents?: number | null
          options?: Json
          question?: string
          stream_id?: string | null
          total_revenue_cents?: number | null
          total_votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "polls_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          id: string
          is_creator: boolean | null
          updated_at: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_creator?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          is_creator?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      review_forms: {
        Row: {
          business_id: string | null
          created_at: string | null
          custom_slug: string | null
          description: string | null
          id: string
          share_token: string | null
          submissions: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          custom_slug?: string | null
          description?: string | null
          id?: string
          share_token?: string | null
          submissions?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          custom_slug?: string | null
          description?: string | null
          id?: string
          share_token?: string | null
          submissions?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      review_responses: {
        Row: {
          browser_info: string | null
          created_at: string | null
          form_id: string | null
          id: string
          ip_address: unknown | null
          response_data: Json | null
          status: string | null
          submitted_at: string | null
          video_url: string | null
        }
        Insert: {
          browser_info?: string | null
          created_at?: string | null
          form_id?: string | null
          id?: string
          ip_address?: unknown | null
          response_data?: Json | null
          status?: string | null
          submitted_at?: string | null
          video_url?: string | null
        }
        Update: {
          browser_info?: string | null
          created_at?: string | null
          form_id?: string | null
          id?: string
          ip_address?: unknown | null
          response_data?: Json | null
          status?: string | null
          submitted_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "review_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_metrics: {
        Row: {
          bitrate: number
          connection_quality: string
          cpu_usage: number
          dropped_frames: number
          fps: number
          id: string
          latency_ms: number
          memory_usage: number
          stream_id: string
          timestamp: string
        }
        Insert: {
          bitrate?: number
          connection_quality?: string
          cpu_usage?: number
          dropped_frames?: number
          fps?: number
          id?: string
          latency_ms?: number
          memory_usage?: number
          stream_id: string
          timestamp?: string
        }
        Update: {
          bitrate?: number
          connection_quality?: string
          cpu_usage?: number
          dropped_frames?: number
          fps?: number
          id?: string
          latency_ms?: number
          memory_usage?: number
          stream_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "stream_metrics_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_recordings: {
        Row: {
          created_at: string
          duration_seconds: number
          file_size_mb: number
          id: string
          is_public: boolean
          session_id: string | null
          stream_id: string
          thumbnail_url: string | null
          title: string
          video_url: string | null
          view_count: number
        }
        Insert: {
          created_at?: string
          duration_seconds?: number
          file_size_mb?: number
          id?: string
          is_public?: boolean
          session_id?: string | null
          stream_id: string
          thumbnail_url?: string | null
          title: string
          video_url?: string | null
          view_count?: number
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          file_size_mb?: number
          id?: string
          is_public?: boolean
          session_id?: string | null
          stream_id?: string
          thumbnail_url?: string | null
          title?: string
          video_url?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "stream_recordings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "stream_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stream_recordings_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_sessions: {
        Row: {
          avg_bitrate: number | null
          created_at: string
          duration_seconds: number | null
          id: string
          peak_viewers: number
          quality_score: number | null
          session_end: string | null
          session_start: string
          stream_id: string
          total_messages: number
          total_tips: number
        }
        Insert: {
          avg_bitrate?: number | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          peak_viewers?: number
          quality_score?: number | null
          session_end?: string | null
          session_start?: string
          stream_id: string
          total_messages?: number
          total_tips?: number
        }
        Update: {
          avg_bitrate?: number | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          peak_viewers?: number
          quality_score?: number | null
          session_end?: string | null
          session_start?: string
          stream_id?: string
          total_messages?: number
          total_tips?: number
        }
        Relationships: [
          {
            foreignKeyName: "stream_sessions_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "streams"
            referencedColumns: ["id"]
          },
        ]
      }
      streams: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          ended_at: string | null
          hls_url: string | null
          id: string
          is_recording: boolean
          max_viewers: number
          rtmp_key: string
          started_at: string | null
          status: string
          stream_key: string
          thumbnail_url: string | null
          title: string
          total_revenue_cents: number | null
          viewer_count: number
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          ended_at?: string | null
          hls_url?: string | null
          id?: string
          is_recording?: boolean
          max_viewers?: number
          rtmp_key?: string
          started_at?: string | null
          status?: string
          stream_key?: string
          thumbnail_url?: string | null
          title?: string
          total_revenue_cents?: number | null
          viewer_count?: number
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          ended_at?: string | null
          hls_url?: string | null
          id?: string
          is_recording?: boolean
          max_viewers?: number
          rtmp_key?: string
          started_at?: string | null
          status?: string
          stream_key?: string
          thumbnail_url?: string | null
          title?: string
          total_revenue_cents?: number | null
          viewer_count?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          facebook_url: string | null
          full_name: string
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          subscription_plan: string | null
          subscription_renewal: string | null
          subscription_renewal_date: string | null
          subscription_status: string | null
          twitter_url: string | null
          updated_at: string | null
          user_id: string | null
          username: string
          website_url: string | null
          youtube_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          facebook_url?: string | null
          full_name: string
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          subscription_plan?: string | null
          subscription_renewal?: string | null
          subscription_renewal_date?: string | null
          subscription_status?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          username: string
          website_url?: string | null
          youtube_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          facebook_url?: string | null
          full_name?: string
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          subscription_plan?: string | null
          subscription_renewal?: string | null
          subscription_renewal_date?: string | null
          subscription_status?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string
          website_url?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_pin_duration: {
        Args: { amount_cents: number }
        Returns: unknown
      }
      regenerate_stream_key: {
        Args: { _stream_id: string }
        Returns: string
      }
      update_stream_metrics: {
        Args: {
          _bitrate: number
          _connection_quality: string
          _cpu_usage: number
          _dropped_frames: number
          _fps: number
          _latency_ms: number
          _memory_usage: number
          _stream_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
