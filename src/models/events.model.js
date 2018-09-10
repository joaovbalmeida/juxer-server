// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const tracks = new Schema({
    uri: { type: String, required: true },
    owner: { type: String },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    cover: { type: String, required: true },
  }, {
    timestamps: true
  });

  const playlists = new Schema({
    url: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    name: { type: String, required: true },
    image: { type: String, required: true },
    total: { type: String, required: true },
    tracks: [tracks],
  }, {
    timestamps: true
  });

  const events = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    playlists: [playlists],
    guests: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    queue: [tracks],
    name: { type: String, required: true },
    secret: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true },
    index: { type: Number, default: 0 }
  }, {
    timestamps: true
  });

  return mongooseClient.model('events', events);
};
