const { authenticate } = require('@feathersjs/authentication').hooks;
const { paramsFromClient } = require('feathers-hooks-common');
const {
  associateCurrentUser,
  restrictToOwner,
} = require('feathers-authentication-hooks');

const restrictToEventOwner = require('../../hooks/restrict-to-event-owner');

const updateChannel = require('../../hooks/update-channel');
const createChannel = require('../../hooks/create-channel');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [ paramsFromClient('user', 'server') ],
    create: [ paramsFromClient('user'), associateCurrentUser({ as: 'user' }) ],
    update: [ restrictToOwner({ ownerField: 'user' }) ],
    patch: [ paramsFromClient('user'), restrictToEventOwner() ],
    remove: [ restrictToOwner({ ownerField: 'user' }) ]
  },

  after: {
    all: [],
    find: [],
    get: [updateChannel()],
    create: [createChannel()],
    update: [updateChannel()],
    patch: [updateChannel()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
