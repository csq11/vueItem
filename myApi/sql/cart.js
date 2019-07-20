const mongoose = require('./db');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  goods_name: { type: String },
  image_url: { type: String },
  sales: { type: String },
  shopname: { type: String },
  goods_more1: { type: String },
  goods_more2: { type: String },
  goods_page: { type: String }
})

module.exports = mongoose.model('Cart', CartSchema);
