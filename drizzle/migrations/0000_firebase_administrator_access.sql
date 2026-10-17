CREATE TABLE public.firebase_admin_roles (
  firebase_uid text PRIMARY KEY,
  role text NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.firebase_admin_roles TO service_role;
ALTER TABLE public.firebase_admin_roles ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.firebase_profiles (
  firebase_uid text PRIMARY KEY,
  display_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.firebase_profiles TO service_role;
ALTER TABLE public.firebase_profiles ENABLE ROW LEVEL SECURITY;
REVOKE UPDATE ON public.requests FROM anon, authenticated;
GRANT ALL ON public.requests TO service_role;
COMMENT ON TABLE public.firebase_admin_roles IS 'Server-managed administrator grants keyed by verified Firebase UID. Never writable by clients.';