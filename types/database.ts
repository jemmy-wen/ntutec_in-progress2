/**
 * Unified Supabase Database Types for NTUTEC Platform
 *
 * Covers all modules: Angel Club, Mentor Matching (reserved), Admin, Shared
 * Table names follow Platform Architecture v0.4 naming convention:
 *   pip_* = Pipeline   angel_* = Angel Club   sys_* = System   mentor_* = Mentor (reserved)
 *
 * This file is the source of truth for TypeScript types.
 * Regenerate from Supabase CLI: npx supabase gen types typescript --project-id <id>
 */

export interface Database {
  public: {
    Tables: {
      // ─── Shared: Auth & Roles ───
      module_roles: {
        Row: {
          id: string
          user_id: string
          module: string        // 'angel_club' | 'mentor_clinic' | 'platform'
          role: string          // PlatformRole
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<ModuleRole, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ModuleRole, 'id'>>
      }

      // ─── Shared: Notifications ───
      in_app_notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          body: string | null
          type: 'info' | 'action' | 'warning' | 'success'
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          title: string
          body?: string | null
          type?: 'info' | 'action' | 'warning' | 'success'
          link?: string | null
        }
        Update: {
          is_read?: boolean
        }
      }

      // ─── Shared: Audit ───
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          changes: Record<string, unknown> | null
          metadata: Record<string, unknown> | null
          created_at: string
        }
        Insert: Omit<AuditLog, 'id' | 'created_at'>
        Update: never
      }

      // ─── Pipeline: Startups ───
      pip_startups: {
        Row: {
          id: string
          name_zh: string
          name_en: string | null
          tax_id: string | null
          sector: string | null
          one_liner: string | null
          pipeline_stage: number
          gate0_score: number | null
          gate1_score: number | null
          status: string
          observation_pool: boolean
          observation_reason: string | null
          observation_entered_at: string | null
          reactivated_at: string | null
          reactivated_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name_zh: string
          name_en?: string | null
          tax_id?: string | null
          sector?: string | null
          one_liner?: string | null
          pipeline_stage?: number
        }
        Update: Partial<Omit<PipStartup, 'id' | 'created_at'>>
      }

      // ─── Pipeline: Gate Evaluations ───
      gates: {
        Row: {
          id: string
          startup_id: string
          gate_type: string          // 'gate0' | 'gate1' | 'gate2'
          result: string | null
          screening_result: string | null
          evaluation_date: string | null
          evaluator: string | null
          notes: string | null
          flags: string[] | null
          fail_reasons: string[] | null
          // Gate 1 dimension scores
          sosv_market: number | null
          sosv_solution: number | null
          sosv_timing: number | null
          sosv_team: number | null
          sosv_traction: number | null
          gate1_confidence: string | null
          gate1_action: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          startup_id: string
          gate_type: string
          result?: string | null
          screening_result?: string | null
          evaluation_date?: string | null
          evaluator?: string | null
          notes?: string | null
        }
        Update: {
          result?: string | null
          screening_result?: string | null
          evaluation_date?: string | null
          notes?: string | null
          sosv_market?: number | null
          sosv_solution?: number | null
          sosv_timing?: number | null
          sosv_team?: number | null
          sosv_traction?: number | null
          gate1_confidence?: string | null
          gate1_action?: string | null
        }
      }

      // ─── Pipeline: Meetings ───
      pip_meetings: {
        Row: {
          id: string           // YYYY-MM format
          meeting_date: string
          status: string       // MeetingCycleStatus
          is_archived: boolean
          cards_ready_at: string | null
          vote_open_at: string | null
          meeting_at: string | null
          followup_until: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          meeting_date: string
          status?: string
        }
        Update: Partial<Omit<PipMeeting, 'id' | 'created_at'>>
      }

      pip_meeting_pitches: {
        Row: {
          id: string
          meeting_id: string
          startup_id: string
          pitch_order: number
          decision: string | null      // 'invest' | 'pass' | 'defer' | null
          followup_status: string      // 'pending' | 'contacted' | 'visited' | 'closed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          meeting_id: string
          startup_id: string
          pitch_order?: number
        }
        Update: Partial<Omit<PipMeetingPitch, 'id' | 'created_at'>>
      }

      // ─── Angel: Members (View alias for investors table) ───
      angel_members: {
        Row: {
          id: string
          user_id: string | null
          display_name: string
          email: string | null
          phone: string | null
          company: string | null
          title: string | null
          status: string          // 'active' | 'inactive' | 'pending'
          tier: string | null     // 'founding' | 'regular' | 'associate'
          investment_preferences: Record<string, unknown> | null
          joined_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          display_name: string
          email?: string | null
          status?: string
        }
        Update: Partial<Omit<AngelMember, 'id' | 'created_at'>>
      }

      // ─── Angel: Card Responses ───
      angel_card_responses: {
        Row: {
          id: string
          angel_member_id: string
          startup_id: string
          meeting_cycle: string
          response: 'interested' | 'thinking' | 'not_for_me'
          interest_reason: string | null
          cards_viewed: number
          time_spent_seconds: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          angel_member_id: string
          startup_id: string
          meeting_cycle: string
          response: 'interested' | 'thinking' | 'not_for_me'
          interest_reason?: string | null
          cards_viewed?: number
          time_spent_seconds?: number | null
        }
        Update: {
          response?: 'interested' | 'thinking' | 'not_for_me'
          interest_reason?: string | null
          cards_viewed?: number
          time_spent_seconds?: number | null
        }
      }

      // ─── Angel: Votes ───
      angel_votes: {
        Row: {
          id: string
          angel_member_id: string
          startup_id: string
          meeting_cycle: string
          decision: 'invest' | 'pass' | 'defer'
          intended_amount_range: string | null
          attended_meeting: boolean
          reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          angel_member_id: string
          startup_id: string
          meeting_cycle: string
          decision: 'invest' | 'pass' | 'defer'
          intended_amount_range?: string | null
          attended_meeting?: boolean
          reason?: string | null
        }
        Update: {
          decision?: 'invest' | 'pass' | 'defer'
          intended_amount_range?: string | null
          reason?: string | null
        }
      }

      // ─── Angel: Learning Progress ───
      angel_learning_progress: {
        Row: {
          id: string
          angel_member_id: string
          content_type: 'digest' | 'industry_report' | 'case_study' | 'tutorial'
          content_id: string
          read_at: string
          completion_pct: number
        }
        Insert: {
          angel_member_id: string
          content_type: 'digest' | 'industry_report' | 'case_study' | 'tutorial'
          content_id: string
          completion_pct?: number
        }
        Update: {
          completion_pct?: number
        }
      }

      // ─── Angel: Notifications (angel-specific) ───
      angel_notifications: {
        Row: {
          id: string
          angel_member_id: string
          notification_type: string   // 'cards_ready' | 'review_nudge' | 'vote_open' | 'meeting_reminder'
          meeting_cycle: string
          sent_at: string
          channel: string             // 'email' | 'in_app' | 'telegram'
        }
        Insert: {
          angel_member_id: string
          notification_type: string
          meeting_cycle: string
          channel?: string
        }
        Update: never
      }
    }

    Views: {
      v_meeting_candidate_summary: {
        Row: {
          id: string
          name_zh: string
          sector: string | null
          interested_count: number
          thinking_count: number
          not_for_me_count: number
          total_responses: number
          total_active_members: number
          engagement_rate: number
        }
      }
      v_vote_summary: {
        Row: {
          startup_id: string
          name_zh: string
          invest_count: number
          pass_count: number
          defer_count: number
          total_votes: number
          invest_rate: number
        }
      }
      v_angel_engagement: {
        Row: {
          id: string
          display_name: string
          card_response_rate: number
          vote_participation_rate: number
          articles_read: number
          engagement_level: 'active' | 'moderate' | 'low'
        }
      }
    }

    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// ─── Convenience type aliases ───
type ModuleRole = Database['public']['Tables']['module_roles']['Row']
type AuditLog = Database['public']['Tables']['audit_logs']['Row']
type PipStartup = Database['public']['Tables']['pip_startups']['Row']
type PipMeeting = Database['public']['Tables']['pip_meetings']['Row']
type PipMeetingPitch = Database['public']['Tables']['pip_meeting_pitches']['Row']
type AngelMember = Database['public']['Tables']['angel_members']['Row']

export type CardResponse = Database['public']['Tables']['angel_card_responses']['Row']
export type AngelVote = Database['public']['Tables']['angel_votes']['Row']
export type LearningProgress = Database['public']['Tables']['angel_learning_progress']['Row']
export type MeetingCandidateSummary = Database['public']['Views']['v_meeting_candidate_summary']['Row']
export type VoteSummary = Database['public']['Views']['v_vote_summary']['Row']
export type AngelEngagement = Database['public']['Views']['v_angel_engagement']['Row']
