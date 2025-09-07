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
      [_ in never]: never
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
