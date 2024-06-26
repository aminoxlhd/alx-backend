import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err.message);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('Redis client not connected to the server:', error.message);
  } finally {
    await client.quit();
  }
})();

