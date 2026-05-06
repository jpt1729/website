import { createClient } from "@vercel/edge-config";
import { SPOTIFY_LINKS } from "../../config/spotify-links.js";

export const prerender = false;

export async function GET() {
  let index = 0;

  // Read current index from Edge Config
  try {
    const client = createClient(process.env.EDGE_CONFIG);
    const stored = await client.get("spotifyLinkIndex");
    if (typeof stored === "number") index = stored;
  } catch {
    // Edge Config unavailable — fall back to first link
  }

  const safeIndex = Math.min(index, SPOTIFY_LINKS.length - 1);
  const link = SPOTIFY_LINKS[safeIndex];

  // Advance to next link (fire-and-forget, don't block the redirect)
  if (safeIndex < SPOTIFY_LINKS.length - 1) {
    fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { operation: "update", key: "spotifyLinkIndex", value: safeIndex + 1 },
          ],
        }),
      }
    ).catch(() => {});
  }

  return Response.redirect(link, 302);
}
