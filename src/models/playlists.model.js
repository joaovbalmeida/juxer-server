// playlists-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const track = new Schema({
    uri: { type: String, required: true },
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    cover: { type: String, required: true },
  });

  const playlists = new Schema({
    event: { type: Schema.Types.ObjectId, ref: 'events', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    url: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    name: { type: String, required: true },
    image: { type: String, required: true },
    total: { type: String, required: true },
    tracks: [track],
  }, {
    timestamps: true
  });

  return mongooseClient.model('playlists', playlists);
};
