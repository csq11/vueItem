const mongoose = require('./db');
const Schema = mongoose.Schema;

const ConsumerSchema = new Schema({
  name: { type: String },
  date: { type: String },
  words: { type: Number },
  pic: { type: String },
  img1: { type: String },
  img2: { type: String }
})

module.exports = mongoose.model('Consumer', ConsumerSchema);
