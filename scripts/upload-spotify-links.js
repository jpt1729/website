#!/usr/bin/env node
// Appends Spotify invite links to your Blob-stored pool.
// Usage: node --env-file=.env.local scripts/upload-spotify-links.js

import { put, list } from "@vercel/blob";

const NEW_LINKS = [

];

if (!NEW_LINKS.length) {
  console.error("No links to upload — add links to the NEW_LINKS array first.");
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN in .env.local");
  process.exit(1);
}

// Read current pool
const { blobs } = await list({ prefix: "spotify-links.json" });
let current = [];
if (blobs.length > 0) {
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  current = await res.json();
}

const merged = [...current, ...NEW_LINKS];

await put("spotify-links.json", JSON.stringify(merged), {
  access: "public",
  addRandomSuffix: false,
  allowOverwrite: true,
  contentType: "application/json",
});

console.log(`Uploaded ${NEW_LINKS.length} link(s). Pool now has ${merged.length} link(s) remaining.`);
