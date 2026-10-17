import { firebaseAuth } from '@/integrations/firebase/client';

export type AdminProfile = { firebase_uid: string; display_name: string; email: string };

export async function adminApi<T>(body: Record<string, unknown>): Promise<T> {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error('Please sign in to continue.');
  const token = await user.getIdToken();
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/firebase-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to complete this action.');
  return data as T;
}

export function firebaseLoginError(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'The email or password is incorrect.';
    case 'auth/operation-not-allowed': return 'Email/password sign-in needs to be enabled in Firebase.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed': return 'Unable to connect. Check your internet connection.';
    case 'auth/user-disabled': return 'This administrator account is disabled.';
    default: return error instanceof Error ? error.message : 'Unable to sign in. Please try again.';
  }
}