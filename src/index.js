/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
// const port2 = app.get('port2');
const server = app.listen(process.env.PORT || port);

// Spotify Oauth
// const sptApp = require('./spotify-server');
// sptApp.listen(process.env.PORT || port2, () => logger.info('Spotify Oauth app listening on port 3000!'));

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
