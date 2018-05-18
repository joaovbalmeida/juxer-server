// playlists-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const playlists = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
  }, {
    timestamps: true
  });

  return mongooseClient.model('playlists', playlists);
};
