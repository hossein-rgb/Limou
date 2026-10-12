// ═══════════════════════════════════════════════════════════════════════════
// /api/fonts — private font storage per user (Vercel Private Blob)
//   GET  /api/fonts?hash=<sha256>  → returns the user's font file
//   POST /api/fonts                → stores the font file sent as raw bytes
// Every request must carry the user's Firebase ID token:
//   Authorization: Bearer <token>
// Files live at fonts/<firebase-uid>/<sha256>. The folder comes ONLY from the
// verified token, so a user can never read or write another user's fonts.
// No secret is needed: Firebase tokens are verified with Google's public keys,
// and the Blob store authenticates through Vercel OIDC automatically.
// ═══════════════════════════════════════════════════════════════════════════
import { put, get } from '@vercel/blob';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createHash } from 'node:crypto';

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'limou-5794e';
const JWKS = createRemoteJWKSet(new URL(
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
));
const MAX_BYTES = 4 * 1024 * 1024;           // Vercel request body limit is 4.5 MB
const HASH_RE   = /^[a-f0-9]{64}$/;
// First 4 bytes of valid font files: TrueType, OpenType (CFF), Apple 'true', WOFF, WOFF2
const FONT_SIGS = ['00010000', '4f54544f', '74727565', '774f4646', '774f4632'];

const json = (status, data) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

// Returns the Firebase uid of the caller, or null if the token is missing/invalid.
async function userId(request) {
  const m = /^Bearer (.+)$/.exec(request.headers.get('authorization') || '');
  if (!m) return null;
  try {
    const { payload } = await jwtVerify(m[1], JWKS, {
      issuer: `https://securetoken.google.com/${PROJECT_ID}`,
      audience: PROJECT_ID,
      algorithms: ['RS256'],
    });
    return typeof payload.sub === 'string' && payload.sub ? payload.sub : null;
  } catch {
    return null;
  }
}

export async function GET(request) {
  const uid = await userId(request);
  if (!uid) return json(401, { error: 'unauthorized' });
  const hash = new URL(request.url).searchParams.get('hash') || '';
  if (!HASH_RE.test(hash)) return json(400, { error: 'invalid hash' });
  try {
    const r = await get(`fonts/${uid}/${hash}`, {
      access: 'private',
      ifNoneMatch: request.headers.get('if-none-match') ?? undefined,
    });
    if (r?.statusCode === 304) {
      return new Response(null, { status: 304, headers: { ETag: r.blob.etag, 'Cache-Control': 'private, no-cache' } });
    }
    if (r?.statusCode !== 200) return json(404, { error: 'not found' });
    return new Response(r.stream, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        ETag: r.blob.etag,
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch {
    return json(404, { error: 'not found' });
  }
}

export async function POST(request) {
  const uid = await userId(request);
  if (!uid) return json(401, { error: 'unauthorized' });
  if (+(request.headers.get('content-length') || 0) > MAX_BYTES) return json(413, { error: 'too large' });
  const buf = Buffer.from(await request.arrayBuffer());
  if (!buf.length || buf.length > MAX_BYTES) return json(413, { error: 'too large' });
  if (!FONT_SIGS.includes(buf.subarray(0, 4).toString('hex'))) return json(415, { error: 'not a font file' });
  // Content-addressed: the server computes the hash itself, so the path always matches the bytes.
  const hash = createHash('sha256').update(buf).digest('hex');
  await put(`fonts/${uid}/${hash}`, buf, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/octet-stream',
  });
  return json(200, { hash, size: buf.length });
}
