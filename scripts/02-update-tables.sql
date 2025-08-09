-- Update orders table to include phone field
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone VARCHAR(10);

-- Update contact_messages table to include phone field
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone VARCHAR(10);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_phone ON contact_messages(phone);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
