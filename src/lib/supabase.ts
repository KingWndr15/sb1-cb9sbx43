import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured and connected
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Supabase connection error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to check Supabase connection:", err);
    return false;
  }
}

export async function getLandingPageTemplate(templateName: string) {
  console.log("Fetching template with name:", templateName);

  const { data, error } = await supabase
    .from("landing_page_templates")
    .select("*")
    .eq("name", templateName)
    .single();

  console.log("getLandingPageTemplate data:", data);
  console.log("getLandingPageTemplate error:", error);

  if (error) {
    if (error.code === "PGRST116") {
      console.error(
        "Template not found or multiple templates exist for this name."
      );
      throw new Error(
        "The template could not be fetched. Ensure the template name is unique in the database."
      );
    }
    throw error;
  }
  return data;
}

export async function saveUserWebsite(
  userId: string,
  templateId: string,
  subdomain: string
) {
  const { data, error } = await supabase
    .from("user_websites")
    .insert({
      user_id: userId,
      template_id: templateId,
      subdomain,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveWebsiteContent(websiteId: string, content: any) {
  const { data, error } = await supabase
    .from("website_content")
    .upsert({
      website_id: websiteId,
      content,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveWebsiteAsset(
  websiteId: string,
  file: File,
  type: "logo" | "catalog"
) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${websiteId}/${type}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("website-assets")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("website-assets").getPublicUrl(fileName);

  const { data, error } = await supabase
    .from("website_assets")
    .insert({
      website_id: websiteId,
      type,
      url: publicUrl,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
