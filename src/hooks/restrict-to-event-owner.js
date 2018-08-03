const errors = require('@feathersjs/errors');

module.exports = function () {
  return async context => {
    const data = context.data;

    return context.service.get(context.id).then((result) => {
      if (
        ( !data.name && !data.active && !data.secret && !data.user && !data.playlists )
      ) return context;

      if (context.params.user._id.toString() === result.user.toString()) return context;

      throw new errors.BadRequest('Permission denied to patch some fields.');
    }, () => {
      throw new errors.NotFound('Event does not exist');
    });
  };
};
