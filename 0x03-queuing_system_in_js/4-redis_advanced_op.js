import redis from 'redis'


const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err.message);
});

function createSchoolHash() {
  const schoolLocations = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };

  Object.entries(schoolLocations).forEach(([location, students]) => {
    client.hset('HolbertonSchools', location, students, redis.print);
  });
}

function displaySchoolHash() {
  client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.error('Error getting school hash:', err.message);
    } else {
      console.log(reply);
    }
  });
}

client.on('connect', () => {
  createSchoolHash();
  displaySchoolHash();
});

