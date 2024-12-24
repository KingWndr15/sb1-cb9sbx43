/*
  # Template Customization Schema

  1. New Tables
    - website_content: Stores customized content for each website
    - catalog_items: Stores catalog/product entries
    - website_assets: Stores uploaded images and logos
  
  2. Security
    - Enable RLS on all tables
    - Add policies for user-specific access
*/

-- Website content table
CREATE TABLE website_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES user_websites(id) ON DELETE CASCADE,
  content jsonb NOT NULL DEFAULT '{}',
  theme jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Catalog items table
CREATE TABLE catalog_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES user_websites(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  price decimal(10,2),
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Website assets table
CREATE TABLE website_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES user_websites(id) ON DELETE CASCADE,
  type text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their website content"
  ON website_content
  USING (website_id IN (
    SELECT id FROM user_websites WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their catalog items"
  ON catalog_items
  USING (website_id IN (
    SELECT id FROM user_websites WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their website assets"
  ON website_assets
  USING (website_id IN (
    SELECT id FROM user_websites WHERE user_id = auth.uid()
  ));