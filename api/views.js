import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  let count = await kv.get("visitorCount");

  if (count === null) {
    count = 1270;  // starting count
    await kv.set("visitorCount", count);
  }

  count++;
  await kv.set("visitorCount", count);

  res.status(200).json({ views: count });
}
