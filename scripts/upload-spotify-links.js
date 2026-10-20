#!/usr/bin/env node
// Adds Spotify invite links to your Blob-stored pool, one immutable blob per link.
// Also migrates the legacy single-file pool (spotify-links.json) if it still exists.
// Usage: npm run spotify:upload

import { put, list, del } from "@vercel/blob";

const NEW_LINKS = [

];

const PREFIX = "spotify-links/";
const LEGACY_PATHNAME = "spotify-links.json";

if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
  console.error("Missing Blob credentials — run `vercel env pull .env.local` first.");
  process.exit(1);
}

// Pick up links from the legacy JSON pool so nothing is lost in the migration.
const { blobs: legacy } = await list({ prefix: LEGACY_PATHNAME });
const legacyBlob = legacy.find((b) => b.pathname === LEGACY_PATHNAME);
let legacyLinks = [];
if (legacyBlob) {
  // Cache-bust: the legacy file was overwritten in place, so the CDN copy may be stale.
  const res = await fetch(`${legacyBlob.url}?v=${Date.now()}`, { cache: "no-store" });
  legacyLinks = await res.json();
}

const links = [...legacyLinks, ...NEW_LINKS];

if (!links.length) {
  console.error("No links to upload — add links to the NEW_LINKS array first.");
  process.exit(1);
}

// Zero-padded, timestamped names keep the pool in FIFO order when listed.
const batch = Date.now();
for (const [i, link] of links.entries()) {
  await put(`${PREFIX}${batch}-${String(i).padStart(5, "0")}.txt`, link, {
    access: "public",
    addRandomSuffix: false,
    contentType: "text/plain",
  });
}

if (legacyBlob) {
  await del(legacyBlob.url);
  console.log(`Migrated ${legacyLinks.length} link(s) from ${LEGACY_PATHNAME}.`);
}

const { blobs } = await list({ prefix: PREFIX });
console.log(`Uploaded ${NEW_LINKS.length} new link(s). Pool now has ${blobs.length} link(s) remaining.`);
