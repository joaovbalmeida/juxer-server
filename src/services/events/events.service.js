// Initializes the `events` service on path `/events`
const createService = require('feathers-mongoose');
const createModel = require('../../models/events.model');
const hooks = require('./events.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'events',
    Model,
    paginate
  };

  const createChannel = (event, context) => {
    app.channel(`rooms/${event._id}`).join(context.params.connection);
  };

  const updateChannel = (event, context) => {
    if (
      (
        event.user.toString() === context.params.user._id.toString()
        ||
        event.guests.toString().includes(context.params.user._id.toString())
      )
      &&
      event.active
    ) {
      app.channel(`rooms/${event._id}`).join(context.params.connection);
    }
  };

  // Initialize our service with any options it requires
  app.use('/events', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('events');

  service.on('created', createChannel);
  service.on('patched', updateChannel);

  service.publish('patched', (data, context) => {
    if (!data.active && (data.user === context.params.user._id)) {
      app.channel(`rooms/${data._id}`).send(data);
      return app.channel(`rooms/${data._id}`).connections.forEach((connection) => {
        app.channel(`rooms/${data._id}`).leave(connection);
      });
    } else {
      return app.channel(`rooms/${data._id}`).send(data);
    }
  });

  service.publish('updated', (data) => {
    app.channel(`rooms/${data._id}`).send(data);
  });

  service.hooks(hooks);
};
