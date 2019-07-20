const mongoose = require('./db');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: String },
  tel: { type: String },
  name: { type: String },
  city: { type: String },
  address: { type: String },
  choose: {type: String},
  id: {type: String}
})

module.exports = mongoose.model('Address', AddressSchema);
