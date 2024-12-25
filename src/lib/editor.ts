// src/lib/editor.ts
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

export async function getWebsiteCustomization(websiteId: string) {
  const { data, error } = await supabase
    .from('website_content')
    .select('*')
    .eq('website_id', websiteId)
    .single();

  console.log('getWebsiteCustomization data:', data);
  console.log('getWebsiteCustomization error:', error);

  if (error) {
    if (error.code === 'PGRST116') {
      console.warn('No content found for the given websiteId. Returning default template.');
      return {
        content: {
          header: 'Welcome to Your New Website',
          subheader: 'Customize this template to get started',
          about: 'Add your business information here.',
          footer: 'Powered by Flux'
        },
        theme: {
          primary: '#007bff',
          secondary: '#6c757d',
          background: '#ffffff',
          text: '#000000'
        }
      };
    } else {
      throw error;
    }
  }

  return {
    content: data?.content || {
      header: 'Welcome to Your New Website',
      subheader: 'Customize this template to get started',
      about: 'Add your business information here.',
      footer: 'Powered by Flux'
    },
    theme: data?.theme || {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#ffffff',
      text: '#000000'
    }
  };
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

  console.log('updateWebsiteContent data:', data);
  console.log('updateWebsiteContent error:', error);

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

  console.log('uploadAsset data:', data);
  console.log('uploadAsset error:', error);

  if (error) throw error;
  return data;
}