export const requestStatuses = ['Received', 'Documents Verified', 'Processing', 'Recovery Complete'] as const;

export function hasAdminGrant(uid: string, grant: { firebase_uid: string; role: string } | null): boolean {
  return Boolean(uid && grant?.firebase_uid === uid && grant.role === 'admin');
}

export function validIdentityClaims(payload: { sub?: string; iat?: number; exp?: number; auth_time?: unknown }, now: number): boolean {
  return typeof payload.sub === 'string' && payload.sub.length > 0 && payload.sub.length <= 128
    && typeof payload.iat === 'number' && payload.iat <= now
    && typeof payload.exp === 'number' && payload.exp > now
    && typeof payload.auth_time === 'number' && payload.auth_time <= now;
}