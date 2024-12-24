import { supabase } from './supabase';
import type { Database } from '@/types/supabase';

export interface WebsiteContent {
  content: Record<string, string>;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export async function getWebsiteContent(websiteId: string) {
  const { data, error } = await supabase
    .from('website_content')
    .select('*')
    .eq('website_id', websiteId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateWebsiteContent(
  websiteId: string,
  content: Partial<WebsiteContent>
) {
  const { data, error } = await supabase
    .from('website_content')
    .upsert({
      website_id: websiteId,
      ...content,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function uploadAsset(
  websiteId: string,
  file: File,
  type: 'logo' | 'catalog'
) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${websiteId}/${type}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('website-assets')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('website-assets')
    .getPublicUrl(fileName);

  const { data, error } = await supabase
    .from('website_assets')
    .insert({
      website_id: websiteId,
      type,
      url: publicUrl
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}