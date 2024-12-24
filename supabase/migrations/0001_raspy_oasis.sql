/*
  # Templates and User Websites Schema

  1. New Tables
    - `templates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `thumbnail` (text, URL)
      - `category` (text)
      - `created_at` (timestamp)
    
    - `user_websites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `template_id` (uuid, references templates)
      - `subdomain` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for template viewing and user website management
*/

-- Create templates table
CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  thumbnail text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_websites table
CREATE TABLE user_websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  template_id uuid REFERENCES templates NOT NULL,
  subdomain text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_websites ENABLE ROW LEVEL SECURITY;

-- Templates policies (anyone can view)
CREATE POLICY "Templates are viewable by everyone"
  ON templates
  FOR SELECT
  TO authenticated
  USING (true);

-- User websites policies
CREATE POLICY "Users can view their own websites"
  ON user_websites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own websites"
  ON user_websites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own websites"
  ON user_websites
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);