const kue = require('kue');

const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  let progress = 0;
  job.progress(progress); // Initial progress at 0%

  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    return done(error);
  }

  progress = 50;
  job.progress(progress); // Update progress to 50%
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // Simulate sending the notification (replace with actual notification logic)
  console.log('Notification sent!');
  done();
}

const queue = kue.createQueue({
  redis: {
    port: 6379,
    host: 'localhost',
  },
  concurrency: 2, // Process two jobs at a time
});

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});

// Handle job failures (optional)
queue.on('error', (err) => {
  console.error('Job processing error:', err.message);
});

