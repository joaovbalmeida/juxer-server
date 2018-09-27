// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  return async context => {
    if (context.params.server) return context;

    const { user, guests, active, _id } = context.result;
    const userID = context.params.user._id.toString();

    if (active && (user.toString() === userID || guests.toString().includes(userID))) {
      context.app.channel(`rooms/${_id}`).join(context.params.connection);
    } else if (!active && (user.toString() === userID)) {
      context.app.channel(`rooms/${_id}`).connections.forEach((connection) => {
        context.app.channel(`rooms/${_id}`).leave(connection);
      });
    }
    return context;
  };
};
