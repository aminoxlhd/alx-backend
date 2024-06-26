import redis from 'redis'


const client = createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err.message);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');

  client.subscribe('holberton school channel', (err, channel) => {
    if (err) {
      console.error('Error subscribing to channel:', err.message);
    } else {
      console.log(`Subscribed to channel: ${channel}`);
    }
  });

  client.on('message', (channel, message) => {
    console.log(`Received message on '${channel}': ${message}`);

    if (message === 'KILL_SERVER') {
      client.unsubscribe();
      client.quit();
    }
  });
});

