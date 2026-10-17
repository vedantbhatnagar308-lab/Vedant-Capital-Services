import { describe, expect, it } from 'vitest';
import { hasAdminGrant, validIdentityClaims } from '../../supabase/functions/firebase-admin/policy';

describe('Firebase administrator authorization', () => {
  it('denies signed-in users without a protected administrator grant', () => {
    expect(hasAdminGrant('firebase-user', null)).toBe(false);
  });
  it('grants access only to the matching administrator UID', () => {
    expect(hasAdminGrant('admin-one', { firebase_uid: 'admin-one', role: 'admin' })).toBe(true);
    expect(hasAdminGrant('admin-two', { firebase_uid: 'admin-one', role: 'admin' })).toBe(false);
    expect(hasAdminGrant('admin-one', { firebase_uid: 'admin-one', role: 'user' })).toBe(false);
  });
  it('rejects expired tokens and future authentication times', () => {
    const claims = { sub: 'admin-one', iat: 900, exp: 1100, auth_time: 900 };
    expect(validIdentityClaims(claims, 1000)).toBe(true);
    expect(validIdentityClaims({ ...claims, exp: 1000 }, 1000)).toBe(false);
    expect(validIdentityClaims({ ...claims, auth_time: 1001 }, 1000)).toBe(false);
    expect(validIdentityClaims({ ...claims, iat: 1001 }, 1000)).toBe(false);
    expect(validIdentityClaims({ ...claims, sub: '' }, 1000)).toBe(false);
  });
});