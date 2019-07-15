const mongoose = require('./db');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  goods_name: { type: String },
  image_url: { type: String },
  normal_price: { type: Number },
  sales: { type: String },
  shopname: { type: String },
  goods_more1: { type: String },
  goods_more2: { type: String },
  goods_page: { type: String }
})

module.exports = mongoose.model('Product', ProductSchema);
