// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const events = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'playlists' }],
    queue: [
      {
        uri: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'users', required: false },
      }
    ],
    name: { type: String, required: true },
    secret: { type: String, required: true, unique: true },
  }, {
    timestamps: true
  });

  return mongooseClient.model('events', events);
};
