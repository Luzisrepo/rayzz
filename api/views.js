import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  try {
    let count = await redis.get('visitorCount');

    if (count === null) {
      count = 1270;
    }

    count++;
    await redis.set('visitorCount', count);

    res.status(200).json({ views: count });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ error: 'Redis connection failed' });
  }
}
