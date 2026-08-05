CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  attending boolean NOT NULL DEFAULT true,
  guests integer NOT NULL DEFAULT 1,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvps TO anon;
GRANT INSERT ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an rsvp" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (true);