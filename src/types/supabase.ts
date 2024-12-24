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
      templates: {
        Row: {
          id: string
          name: string
          description: string
          thumbnail: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          thumbnail: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          thumbnail?: string
          category?: string
          created_at?: string
        }
      }
      user_websites: {
        Row: {
          id: string
          user_id: string
          template_id: string
          subdomain: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          subdomain: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          subdomain?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}