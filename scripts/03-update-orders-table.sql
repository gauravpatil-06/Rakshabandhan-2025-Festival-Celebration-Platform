-- Remove email column from orders table since we don't collect email in order form
ALTER TABLE orders DROP COLUMN IF EXISTS email;

-- Update payment_status default to 'confirmed'
ALTER TABLE orders ALTER COLUMN payment_status SET DEFAULT 'confirmed';

-- Add payment_method column if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'cod';

-- Update existing records to have confirmed status
UPDATE orders SET payment_status = 'confirmed' WHERE payment_status = 'pending';
