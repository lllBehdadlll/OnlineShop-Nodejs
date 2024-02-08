const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Price: {
    type: String,
    required: true
  },
  Picture: {
    type: String,
    required: true
  },
  PictureAlt: {
    type: String,
    required: true
  },
  PictureTitle: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Product', ProductSchema);