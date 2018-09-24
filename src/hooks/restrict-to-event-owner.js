const { paramsForServer } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');

module.exports = function () {
  return async context => {
    const data = context.data;
    
    return context.app.service('events').get(
      context.id,
      paramsForServer({ user: context.params.user, server: true }),
    ).then((result) => {
      if (
        (
          !data.name &&
          !data.active &&
          !data.secret &&
          !data.user &&
          !data.playlists &&
          !data.index &&
          !data.limit
        )
      ) {
        return context;
      } 

      if (context.params.user._id.toString() === result.user.toString()) return context;

      throw new errors.BadRequest('Permission denied.');
    }, () => {
      throw new errors.NotFound('Event does not exist');
    });
  };
};
