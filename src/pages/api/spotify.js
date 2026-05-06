import { put, list } from "@vercel/blob";

export const prerender = false;

const token = import.meta.env.BLOB_READ_WRITE_TOKEN;

export async function GET() {
  const { blobs } = await list({ prefix: "spotify-links.json", token });

  if (!blobs.length) {
    return new Response("No Spotify links remaining.", { status: 404 });
  }

  const res = await fetch(blobs[0].url, { cache: "no-store" });
  const links = await res.json();

  if (!Array.isArray(links) || links.length === 0) {
    return new Response("No Spotify links remaining.", { status: 404 });
  }

  const [current, ...remaining] = links;

  await put("spotify-links.json", JSON.stringify(remaining), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
    token,
  });

  return Response.redirect(current, 302);
}
