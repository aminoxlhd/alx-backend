const kue = require('kue');
const { expect } = require('chai');

const createPushNotificationsJobs = require('./8-job');

describe('createPushNotificationsJobs function', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue({ redis: { port: 6379, host: 'localhost' } });
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.exit();
    return queue.clear();
  });

  it('should display an error message if jobs is not an array', () => {
    const jobs = 'not an array';
    expect(() => createPushNotificationsJobs(jobs, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs to the queue', async () => {
    const jobs = [
      { phoneNumber: '1234567890', message: 'Test message 1' },
      { phoneNumber: '9876543210', message: 'Test message 2' },
    ];
    await createPushNotificationsJobs(jobs, queue);

    const createdJobs = queue.testMode.created;
    expect(createdJobs).to.have.lengthOf(2);

    createdJobs.forEach((job) => {
      expect(job.type).to.equal('push_notification_code_3');
      expect(job.data).to.deep.equal(jobs.shift());
    });
  });
});

