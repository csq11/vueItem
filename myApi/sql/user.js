const mongoose = require('./db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: { type: String },
  tel: { type: String }
})

module.exports = mongoose.model('User', UserSchema);
