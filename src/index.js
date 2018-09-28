/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const sptPort = app.get('sptPort');
const server = app.listen(port);

// Spotify Oauth
const sptApp = require('./spotify-server');
sptApp.listen(sptPort, () => logger.info('Spotify Oauth app listening on port 3000!'));

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
