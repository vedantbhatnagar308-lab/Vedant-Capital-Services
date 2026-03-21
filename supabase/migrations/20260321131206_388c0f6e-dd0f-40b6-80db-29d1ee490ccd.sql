-- Create requests table
CREATE TABLE public.requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'Received',
  status_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

-- Public can insert requests (form submission)
CREATE POLICY "Anyone can submit a request"
  ON public.requests FOR INSERT
  WITH CHECK (true);

-- Public can read requests (for tracking page)
CREATE POLICY "Anyone can read requests"
  ON public.requests FOR SELECT
  USING (true);

-- Only authenticated users can update (admin)
CREATE POLICY "Authenticated users can update requests"
  ON public.requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_requests_updated_at
  BEFORE UPDATE ON public.requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();