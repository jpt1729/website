import { list, del, BlobPreconditionFailedError, BlobNotFoundError } from "@vercel/blob";
import { getSecret } from "astro:env/server";

export const prerender = false;

// Each invite link is its own immutable blob (see scripts/upload-spotify-links.js).
// Listing goes through the Blob API, so the pool is always current, and immutable
// blobs can never be served stale from the CDN.
const PREFIX = "spotify-links/";

export async function GET() {
  // Read at runtime (never inlined into the bundle). Undefined on Vercel when the
  // store is connected via OIDC, in which case the SDK authenticates on its own.
  const token = getSecret("BLOB_READ_WRITE_TOKEN");
  const { blobs } = await list({ prefix: PREFIX, token });
  blobs.sort((a, b) => a.pathname.localeCompare(b.pathname));

  for (const blob of blobs) {
    const res = await fetch(blob.url);
    if (!res.ok) continue;
    const link = (await res.text()).trim();

    try {
      // Claim the link: only one request can delete this exact version.
      await del(blob.url, { ifMatch: blob.etag, token });
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError || err instanceof BlobNotFoundError) {
        continue; // Another request claimed it first; try the next one.
      }
      throw err;
    }

    return new Response(null, {
      status: 302,
      headers: { Location: link, "Cache-Control": "no-store" },
    });
  }

  return new Response("No Spotify links remaining.", {
    status: 404,
    headers: { "Cache-Control": "no-store" },
  });
}
