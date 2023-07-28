export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activity: {
        Row: {
          accumulated_time: string | null
          created_at: string | null
          current_item_id: number | null
          id: number
          running: boolean
          title: string
        }
        Insert: {
          accumulated_time?: string | null
          created_at?: string | null
          current_item_id?: number | null
          id?: number
          running?: boolean
          title: string
        }
        Update: {
          accumulated_time?: string | null
          created_at?: string | null
          current_item_id?: number | null
          id?: number
          running?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_current_item_id_fkey"
            columns: ["current_item_id"]
            referencedRelation: "item"
            referencedColumns: ["id"]
          }
        ]
      }
      item: {
        Row: {
          activity_id: number
          created_at: string | null
          ended_at: string | null
          id: number
          started_at: string | null
          time: string | null
        }
        Insert: {
          activity_id: number
          created_at?: string | null
          ended_at?: string | null
          id?: number
          started_at?: string | null
          time?: string | null
        }
        Update: {
          activity_id?: number
          created_at?: string | null
          ended_at?: string | null
          id?: number
          started_at?: string | null
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "activity"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
