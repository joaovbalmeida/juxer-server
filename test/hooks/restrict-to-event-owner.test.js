const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const restrictToEventOwner = require('../../src/hooks/restrict-to-event-owner');

describe('\'restrictToEventOwner\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: restrictToEventOwner()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
