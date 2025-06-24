-- Create wishes table
CREATE TABLE IF NOT EXISTS wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name VARCHAR(100) NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample wishes
INSERT INTO wishes (sender_name, recipient_name, message) VALUES
('Priya', 'Rahul', 'Happy Rakshabandhan! May our bond of love grow stronger with each passing year. You are the best brother anyone could ask for!'),
('Anjali', 'Vikram', 'Wishing you happiness, success, and all the love in the world. Thank you for always being my protector and guide.'),
('Kavya', 'Arjun', 'On this special day, I pray for your good health and prosperity. Happy Rakshabandhan, dear brother!'),
('Meera', 'Rohan', 'May this Rakhi bring you joy, happiness, and success in everything you do. Love you always!'),
('Shreya', 'Karan', 'Happy Rakshabandhan! Thank you for being my constant support and making my childhood so memorable.');
