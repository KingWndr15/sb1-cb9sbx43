/*
  # Insert Initial Templates

  1. Changes
    - Insert 5 professional templates into the templates table:
      - Fine Dine (Restaurant)
      - Shopfront (Retail)
      - Pro Services (Service)
      - Creative Space (Portfolio)
      - Eventful (Events)
*/

INSERT INTO templates (name, description, thumbnail, category) VALUES
(
  'Fine Dine',
  'A sleek, modern template perfect for restaurants and cafes. Features menu showcase, reservation form, and customer reviews section.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
  'Restaurant'
),
(
  'Shopfront',
  'An e-commerce-friendly template for small retail businesses. Includes product gallery, shopping cart, and contact form.',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
  'Retail'
),
(
  'Pro Services',
  'A professional template for service-based businesses like consultants or agencies. Features service showcase, testimonials, and contact form.',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
  'Services'
),
(
  'Creative Space',
  'A minimalist template ideal for freelancers and creatives. Includes portfolio gallery, about section, and inquiry form.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  'Portfolio'
),
(
  'Eventful',
  'A vibrant template for events, workshops, or conferences. Features event schedule, registration form, and location map.',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
  'Events'
);