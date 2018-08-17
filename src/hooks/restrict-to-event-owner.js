const errors = require('@feathersjs/errors');

module.exports = function () {
  return async context => {
    const data = context.data;

    return context.service.get(context.id).then((result) => {
      if (
        (!data.name && !data.active && !data.secret && !data.user && !data.playlists && !data.index)
      ) return context;

      if (context.params.user._id.toString() === result.user.toString()) return context;

      throw new errors.BadRequest('Permission denied.');
    }, () => {
      throw new errors.NotFound('Event does not exist');
    });
  };
};
