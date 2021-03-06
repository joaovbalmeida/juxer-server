// Initializes the `playlists` service on path `/playlists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/playlists.model');
const hooks = require('./playlists.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'playlists',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/playlists', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('playlists');

  service.hooks(hooks);
};
