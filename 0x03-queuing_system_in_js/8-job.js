function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((job) => {
    queue.createJob('push_notification_code_3', job)
      .on('complete', (id) => console.log(`Notification job ${id} completed`))
      .on('failed', (err, id) => console.error(`Notification job ${id} failed: ${err.message}`))
      .on('progress', (id, percentage) => console.log(`Notification job ${id} ${percentage}% complete`))
      .save((err) => {
        if (err) {
          console.error('Error creating job:', err.message);
        } else {
          console.log(`Notification job created: ${queue.jobs[0].id}`);
        }
      });
  });
}

module.exports = createPushNotificationsJobs;

