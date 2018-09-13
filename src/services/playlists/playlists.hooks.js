const { authenticate } = require('@feathersjs/authentication').hooks;
const { paramsFromClient } = require('feathers-hooks-common');
const {
  associateCurrentUser,
  restrictToOwner,
} = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ paramsFromClient('user'), associateCurrentUser({ as: 'user' }) ],
    update: [ restrictToOwner({ ownerField: 'user' }) ],
    patch: [ restrictToOwner({ ownerField: 'user' }) ],
    remove: [ restrictToOwner({ ownerField: 'user' }) ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
