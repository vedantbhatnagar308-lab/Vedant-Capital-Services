import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createRemoteJWKSet, jwtVerify } from 'npm:jose@5';
import { z } from 'npm:zod@3';
import { hasAdminGrant, validIdentityClaims, requestStatuses } from './policy.ts';

const projectId = 'vedant-capital-dbbe8';
const keys = createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));
const bodySchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('list') }),
  z.object({ action: z.literal('profile') }),
  z.object({ action: z.literal('save-profile'), display_name: z.string().trim().min(1).max(100) }),
  z.object({ action: z.literal('update'), id: z.string().uuid(), status: z.enum(requestStatuses), status_note: z.string().max(2000).nullable() }),
]);
const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed.' }, 405);
  const token = req.headers.get('Authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return reply({ error: 'Please sign in to continue.' }, 401);
  let identity;
  try {
    const { payload } = await jwtVerify(token, keys, {
      issuer: `https://securetoken.google.com/${projectId}`, audience: projectId, algorithms: ['RS256'],
      requiredClaims: ['sub', 'iat', 'exp', 'auth_time'],
    });
    if (!validIdentityClaims(payload, Math.floor(Date.now() / 1000))) throw new Error('Invalid identity');
    identity = payload;
  } catch {
    return reply({ error: 'Your sign-in has expired or is invalid. Please sign in again.' }, 401);
  }
  const uid = identity.sub;
  if (!uid) return reply({ error: 'Invalid identity.' }, 401);
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !serviceKey) return reply({ error: 'Request management is unavailable.' }, 503);
    const db = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: grant, error: roleError } = await db.from('firebase_admin_roles').select('firebase_uid, role').eq('firebase_uid', uid).maybeSingle();
    if (roleError) throw roleError;
    if (!hasAdminGrant(uid, grant)) return reply({ error: 'This Firebase account has not been granted administrator access.' }, 403);
    let body;
    try { body = bodySchema.safeParse(await req.json()); } catch { return reply({ error: 'Invalid request.' }, 400); }
    if (!body.success) return reply({ error: 'Please check the submitted values.' }, 400);

    if (body.data.action === 'list') {
      const { data, error } = await db.from('requests').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return reply({ requests: data });
    }
    if (body.data.action === 'update') {
      const { id, status, status_note } = body.data;
      const { data, error } = await db.from('requests').update({ status, status_note }).eq('id', id).select('id').maybeSingle();
      if (error) throw error;
      if (!data) return reply({ error: 'Request not found.' }, 404);
      return reply({ success: true });
    }
    const email = typeof identity.email === 'string' ? identity.email : '';
    if (body.data.action === 'save-profile') {
      const { data, error } = await db.from('firebase_profiles').upsert({ firebase_uid: uid, display_name: body.data.display_name, email, updated_at: new Date().toISOString() }).select('firebase_uid, display_name, email').single();
      if (error) throw error;
      return reply({ profile: data });
    }
    const { data: existing, error: readError } = await db.from('firebase_profiles').select('firebase_uid, display_name, email').eq('firebase_uid', uid).maybeSingle();
    if (readError) throw readError;
    if (existing) return reply({ profile: existing });
    const { data, error } = await db.from('firebase_profiles').upsert({ firebase_uid: uid, email, display_name: typeof identity.name === 'string' ? identity.name.slice(0, 100) : '' }, { onConflict: 'firebase_uid', ignoreDuplicates: true }).select('firebase_uid, display_name, email').maybeSingle();
    if (error) throw error;
    return reply({ profile: data });
  } catch {
    return reply({ error: 'Unable to complete this action. Please try again.' }, 500);
  }
});