// users-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function(v) {
          return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: '{VALUE} is not a valid email.'
      },
    },
    picture: { type: String, required: false },
    name: { type: String, required: true },
    facebookId: { type: String },
    spotifyId: { type: String },
    password: { type: String, required: false }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};


