import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

export type Template = Database['public']['Tables']['templates']['Row'];

export async function getTemplates() {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function selectTemplate(userId: string, templateId: string, subdomain: string) {
  const { data, error } = await supabase
    .from('user_websites')
    .insert({
      user_id: userId,
      template_id: templateId,
      subdomain
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}