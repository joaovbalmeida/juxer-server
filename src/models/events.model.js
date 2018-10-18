// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const track = new Schema({
    uri: { type: String, required: true },
    owner: { type: String },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    cover: { type: String, required: true },
  });

  const events = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'playlists', unique: true }],
    guests: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    queue: [track],
    name: { type: String, required: true },
    secret: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true },
    limit: { type: Number },
    index: { type: Number, default: 0 }
  }, {
    timestamps: true
  });

  return mongooseClient.model('events', events);
};
