const kue = require('kue');

const queue = kue.createQueue({
  redis: {
    port: 6379,
    host: 'localhost',
  },
});

const jobData = {
  phoneNumber: '+15551234567',
  message: 'This is a test notification!',
};

queue.createJob('push_notification_code', jobData)
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed', (err) => {
    console.error('Notification job failed:', err.message);
  })
  .save((err) => {
    if (err) {
      console.error('Error creating job:', err.message);
    } else {
      console.log(`Notification job created: ${queue.jobs[0].id}`);
    }
  });

